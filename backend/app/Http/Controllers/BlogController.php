<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    // GET /api/blogs
    public function index()
    {
        return response()->json(Blog::all());
    }

    // POST /api/blogs
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => 'nullable|string|in:Draft,Published,Archived',
        ]);

        // auto-generate slug from title
        $validated['slug'] = Str::slug($validated['title']);

        // default status if not provided
        $validated['status'] = $validated['status'] ?? 'Draft';

        if ($request->hasFile('image')) {
        $path = $request->file('image')->store('blogs', 'public');
        $validated['image'] = $path;
        }

        $blog = Blog::create($validated);

        return response()->json([
            'message' => 'Blog created successfully',
            'data' => $blog
        ], 201);
    }

    // GET /api/blogs/{id}
    public function show($id)
    {
        $blog = Blog::findOrFail($id);

        return response()->json($blog);
    }

    // PUT /api/blogs/{id}
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'sometimes|required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => 'sometimes|required|string|in:Draft,Published,Archived',
        ]);

        // update slug if title changes
        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($request->hasFile('image')) {

            // Delete old image
            if ($blog->image) {
                $oldPath = ltrim(str_replace('/storage/', '', $blog->image), '/');

                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $path = $request->file('image')->store('blogs', 'public');
            $validated['image'] = $path;
        }

        $blog->update($validated);

        return response()->json([
            'message' => 'Blog updated successfully',
            'data' => $blog
        ]);
    }

    // DELETE /api/blogs/{id}
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);


        // Delete image from storage
        if ($blog->image) {
            $oldPath = str_replace('/storage/', '', $blog->image);

            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }
        $blog->delete();

        return response()->json([
            'message' => 'Blog deleted successfully'
        ]);
    }
}
