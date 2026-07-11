<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Services\SupabaseStorageService;
use Illuminate\Http\Request;

class AboutController extends Controller
{


    // GET /api/abouts
    public function index()
    {
        return response()->json(About::all());
    }



    // POST /api/abouts
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'cv_file' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png,webp|max:10240',
        ]);


        $storage = new SupabaseStorageService();



        if ($request->hasFile('image')) {

            $validated['image'] =
                $storage->uploadImage(
                    $request->file('image'),
                    'abouts'
                );
        }



        if ($request->hasFile('cv_file')) {

            $validated['cv_file'] =
                $storage->uploadDocument(
                    $request->file('cv_file'),
                    'cvs'
                );
        }



        $about = About::create($validated);



        return response()->json([
            'message' => 'About information created successfully',
            'data' => $about
        ], 201);
    }





    // GET /api/abouts/{id}
    public function show($id)
    {
        return response()->json(
            About::findOrFail($id)
        );
    }





    // Download CV
    public function downloadCv($id)
    {
        $about = About::findOrFail($id);


        if (!$about->cv_file) {

            return response()->json([
                'message' => 'CV not found.'
            ], 404);

        }


        return redirect($about->cv_file);
    }





    // PUT /api/abouts/{id}
    public function update(Request $request, $id)
    {

        $about = About::findOrFail($id);

        $storage = new SupabaseStorageService();



        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'sometimes|required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'cv_file' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png,webp|max:10240',
        ]);




        if ($request->hasFile('image')) {


            if ($about->image) {

                $storage->deleteImage(
                    $about->image
                );

            }



            $validated['image'] =
                $storage->uploadImage(
                    $request->file('image'),
                    'abouts'
                );

        }





        if ($request->hasFile('cv_file')) {


            if ($about->cv_file) {

                $storage->deleteDocument(
                    $about->cv_file
                );

            }



            $validated['cv_file'] =
                $storage->uploadDocument(
                    $request->file('cv_file'),
                    'cvs'
                );

        }



        $about->update($validated);



        return response()->json([
            'message' => 'About information updated successfully',
            'data' => $about
        ]);
    }





    // DELETE /api/abouts/{id}
    public function destroy($id)
    {

        $about = About::findOrFail($id);

        $storage = new SupabaseStorageService();



        if ($about->image) {

            $storage->deleteImage(
                $about->image
            );

        }



        if ($about->cv_file) {

            $storage->deleteDocument(
                $about->cv_file
            );

        }



        $about->delete();



        return response()->json([
            'message' => 'About information deleted successfully'
        ]);
    }

}
