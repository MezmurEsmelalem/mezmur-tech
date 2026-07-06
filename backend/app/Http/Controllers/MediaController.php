<?php

// namespace App\Http\Controllers;

// use App\Models\Media;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Storage;

// class MediaController extends Controller
// {
    /**
     * Get all media files
     */
    // public function index()
    // {
    //     return response()->json(
    //         Media::latest()->get()
    //     );
    // }

    /**
     * Upload image
     */
    // public function uploadImage(Request $request)
    // {
    //     $request->validate([
    //         'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
    //     ]);

    //     $file = $request->file('image');

    //     $path = $file->store('images', 'public');

    //     $media = Media::create([
    //         'name' => $file->getClientOriginalName(),
    //         'file_path' => $path,
    //         'type' => 'image',
    //     ]);

    //     return response()->json([
    //         'message' => 'Image uploaded successfully',
    //         'media' => $media,
    //         'url' => asset('storage/' . $path),
    //     ], 201);
    // }

    /**
     * Upload video
     */
    // public function uploadVideo(Request $request)
    // {
    //     $request->validate([
    //         'video' => 'required|mimes:mp4,mov,avi,webm,mkv|max:51200',
    //     ]);

    //     $file = $request->file('video');

    //     $path = $file->store('videos', 'public');

    //     $media = Media::create([
    //         'name' => $file->getClientOriginalName(),
    //         'file_path' => $path,
    //         'type' => 'video',
    //     ]);

    //     return response()->json([
    //         'message' => 'Video uploaded successfully',
    //         'media' => $media,
    //         'url' => asset('storage/' . $path),
    //     ], 201);
    // }

    /**
     * Show one media file
     */
    // public function show($id)
    // {
    //     $media = Media::findOrFail($id);

    //     return response()->json([
    //         'media' => $media,
    //         'url' => asset('storage/' . $media->file_path),
    //     ]);
    // }

    /**
     * Delete media
     */
//     public function destroy($id)
//     {
//         $media = Media::findOrFail($id);

//         if (Storage::disk('public')->exists($media->file_path)) {
//             Storage::disk('public')->delete($media->file_path);
//         }

//         $media->delete();

//         return response()->json([
//             'message' => 'Media deleted successfully'
//         ]);
//     }
// }
