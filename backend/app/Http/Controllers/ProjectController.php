<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
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

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('projects', 'public');
            }

            $validated['images'] = $imagePaths;
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

        if ($request->hasFile('images')) {

            if ($project->images) {

                foreach ($project->images as $oldImage) {

                    if (Storage::disk('public')->exists($oldImage)) {
                        Storage::disk('public')->delete($oldImage);
                    }

                }

            }

            $imagePaths = [];

            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('projects', 'public');
            }

            $validated['images'] = $imagePaths;
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

        // Delete image from storage
        if ($project->images) {

            foreach ($project->images as $image) {

                if (Storage::disk('public')->exists($image)) {
                    Storage::disk('public')->delete($image);
                }

            }

        }
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully'
        ]);
    }
}
