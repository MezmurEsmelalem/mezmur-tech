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

        $imagePaths = [];

        if ($request->hasFile('image')) {

            $validated['image'] =
                $this->storage->uploadImage(
                    $request->file('image'),
                    'projects'
                );
        }

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

        if ($request->hasFile('image')) {

            // Delete old image from Supabase
            if ($project->image) {

                $this->storage->deleteImage($project->image);

            }


            // Upload new image to Supabase
            $validated['image'] =
                $this->storage->uploadImage(
                    $request->file('image'),
                    'projects'
                );
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
    if ($project->image) {

        $this->storage->deleteImage($project->image);

    }
        // Delete database record
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully'
        ]);
    }
}
