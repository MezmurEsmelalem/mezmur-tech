<?php

namespace App\Http\Controllers;

use App\Models\About;
use Illuminate\Http\Request;
use App\Services\SupabaseStorageService;

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
        $about = About::first();

        return response()->json($about);
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
        $about = About::findOrFail($id);

        return response()->json($about);
    }


    public function downloadCv($id)
        {
            $about = About::findOrFail($id);

            if (!$about->cv_file) {
                return response()->json([
                    'message' => 'CV not found.'
                ], 404);
            }

            return response()->json([
                'url' => $about->cv_file
            ]);
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

        if ($request->hasFile('image')) {

            // Delete old image from Supabase
            if ($about->image) {

                $this->storage->deleteImage($about->image);

            }


            // Upload new image to Supabase
            $validated['image'] =
                $this->storage->uploadImage(
                    $request->file('image'),
                    'abouts'
                );
        }

        // Replace CV
        if ($request->hasFile('cv_file')) {

    // Delete old CV from Supabase
    if ($about->cv_file) {

        $this->storage->deleteDocument($about->cv_file);

    }


    // Upload new CV
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


    // Delete image from Supabase
    if ($about->image) {

        $this->storage->deleteImage($about->image);

    }


    // Delete CV from Supabase
    if ($about->cv_file) {

        $this->storage->deleteDocument($about->cv_file);

    }


    // Delete database record
    $about->delete();


    return response()->json([
        'message' => 'About information deleted successfully'
    ]);
}
}
