<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    // GET /api/skills
    public function index()
    {
        return response()->json(Skill::all());
    }

    // POST /api/skills
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $skill = Skill::create($validated);

        return response()->json([
            'message' => 'Skill created successfully',
            'data' => $skill
        ], 201);
    }

    // GET /api/skills/{id}
    public function show($id)
    {
        $skill = Skill::findOrFail($id);

        return response()->json($skill);
    }

    // PUT /api/skills/{id}
    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $skill->update($validated);

        return response()->json([
            'message' => 'Skill updated successfully',
            'data' => $skill
        ]);
    }

    // DELETE /api/skills/{id}
    public function destroy($id)
    {
        $skill = Skill::findOrFail($id);
        $skill->delete();

        return response()->json([
            'message' => 'Skill deleted successfully'
        ]);
    }
}
