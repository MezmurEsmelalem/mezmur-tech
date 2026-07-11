<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Services\SupabaseStorageService;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    protected $storage;


    public function __construct(SupabaseStorageService $storage)
    {
        $this->storage = $storage;
    }



    // GET /api/abouts
    public function index()
{
    try {

        return response()->json(About::all());

    } catch (\Throwable $e) {

        return response()->json([
            'error' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ], 500);

    }
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



        if ($request->hasFile('image')) {

            $validated['image'] =
                $this->storage->uploadImage(
                    $request->file('image'),
                    'abouts'
                );
        }



        if ($request->hasFile('cv_file')) {

            $validated['cv_file'] =
                $this->storage->uploadDocument(
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





        // Replace image

        if ($request->hasFile('image')) {


            if ($about->image) {

                $this->storage->deleteImage(
                    $about->image
                );

            }


            $validated['image'] =
                $this->storage->uploadImage(
                    $request->file('image'),
                    'abouts'
                );

        }





        // Replace CV

        if ($request->hasFile('cv_file')) {


            if ($about->cv_file) {

                $this->storage->deleteDocument(
                    $about->cv_file
                );

            }



            $validated['cv_file'] =
                $this->storage->uploadDocument(
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



        if ($about->image) {

            $this->storage->deleteImage(
                $about->image
            );

        }



        if ($about->cv_file) {

            $this->storage->deleteDocument(
                $about->cv_file
            );

        }



        $about->delete();



        return response()->json([
            'message' => 'About information deleted successfully'
        ]);
    }
}
