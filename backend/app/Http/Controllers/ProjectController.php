<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Services\SupabaseStorageService;

class ProjectController extends Controller
{
    // using supabase storage
    protected $storage;

    public function __construct(SupabaseStorageService $storage)
    {
        $this->storage = $storage;
    }
    // GET /api/projects
    public function index()
    {
        return response()->json(Project::all());
    }

    // POST /api/projects
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'status' => 'required|string|max:100',
            'description' => 'required|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
            'github_link' => 'nullable|url|max:255',
            'demo_link' => 'nullable|url|max:255',
        ]);

        $imageUrls = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imageUrls[] = $this->storage->uploadImage($image, 'projects');
            }
        }

        $validated['images'] = $imageUrls;

        $project = Project::create($validated);

        return response()->json([
            'message' => 'Project created successfully',
            'data' => $project
        ], 201);
    }

    // GET /api/projects/{id}
    public function show($id)
    {
        $project = Project::findOrFail($id);

        return response()->json($project);
    }

    // PUT /api/projects/{id}
    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|string|max:100',
            'description' => 'sometimes|required|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
            'github_link' => 'nullable|url|max:255',
            'demo_link' => 'nullable|url|max:255',
        ]);

            if ($request->hasFile('images')) {

            if ($project->images) {
                foreach ($project->images as $image) {
                    $this->storage->deleteImage($image);
                }
            }

            $imageUrls = [];

            foreach ($request->file('images') as $image) {
                $imageUrls[] = $this->storage->uploadImage($image, 'projects');
            }

            $validated['images'] = $imageUrls;
        }

        $project->update($validated);
        return response()->json([
            'message' => 'Project updated successfully',
            'data' => $project
        ]);
    }

    // DELETE /api/projects/{id}
    public function destroy($id)
    {
        $project = Project::findOrFail($id);


        // Delete image from Supabase
            if ($project->images) {
            foreach ($project->images as $image) {
                $this->storage->deleteImage($image);
            }
        }

        $project->delete();
        return response()->json([
            'message' => 'Project deleted successfully'
        ]);
    }
}
