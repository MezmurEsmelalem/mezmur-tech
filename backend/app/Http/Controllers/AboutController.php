<?php

namespace App\Http\Controllers;

use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('abouts', 'public');
            $validated['image'] = $path;
        }

        if ($request->hasFile('cv_file')) {
            $validated['cv_file'] =
                $request->file('cv_file')->store('cvs', 'public');
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

            return Storage::disk('public')->download($about->cv_file);
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

            // Delete old image
            if ($about->image) {
                $oldPath = ltrim(str_replace('/storage/', '', $about->image), '/');

                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $path = $request->file('image')->store('abouts', 'public');
            $validated['image'] = $path;
        }

        // Replace CV
        if ($request->hasFile('cv_file')) {

            // Delete old CV
            if ($about->cv_file) {

                $oldCV = ltrim(str_replace('/storage/', '', $about->cv_file), '/');

                if (Storage::disk('public')->exists($oldCV)) {
                    Storage::disk('public')->delete($oldCV);
                }
            }

            $validated['cv_file'] =
                $request->file('cv_file')->store('cvs', 'public');
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

        // Delete image from storage
        if ($about->image) {
            $oldPath = str_replace('/storage/', '', $about->image);

            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        // Delete CV
        if ($about->cv_file) {

            $oldCV = ltrim(str_replace('/storage/', '', $about->cv_file), '/');

            if (Storage::disk('public')->exists($oldCV)) {
                Storage::disk('public')->delete($oldCV);
            }
        }

        $about->delete();

        return response()->json([
            'message' => 'About information deleted successfully'
        ]);
    }
}
