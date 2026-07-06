<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // GET /api/messages
    public function index()
    {
        return response()->json(Message::all());
    }

    // POST /api/messages (from contact form)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // default status = Unread
        $validated['status'] = 'Unread';

        $message = Message::create($validated);

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $message
        ], 201);
    }

    // GET /api/messages/{id}
    public function show($id)
    {
        $message = Message::findOrFail($id);

        return response()->json($message);
    }

    // PUT /api/messages/{id} (mark as read/replied)
    public function update(Request $request, $id)
    {
        $message = Message::findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|required|string|in:Unread,Read,Replied'
        ]);

        $message->update($validated);

        return response()->json([
            'message' => 'Message updated successfully',
            'data' => $message
        ]);
    }

    // DELETE /api/messages/{id}
    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();

        return response()->json([
            'message' => 'Message deleted successfully'
        ]);
    }
}
