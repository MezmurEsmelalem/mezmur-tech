<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\MediaController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// API health check
Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working'
    ]);
});

// Authentication

// Route::post('/login', [AuthController::class, 'login']);
// Route::get('/user', [AuthController::class, 'user']);
// Route::post('/logout', [AuthController::class, 'logout']);

// Projects (Public Read)
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);

// Skills (Public Read)
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/skills/{id}', [SkillController::class, 'show']);

// Blogs (Public Read)
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{id}', [BlogController::class, 'show']);

// Contact Form (Public)
Route::post('/messages', [MessageController::class, 'store']);

Route::get('/abouts', [AboutController::class, 'index']);
Route::get('/abouts/{id}', [AboutController::class, 'show']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Admin Only)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {


    /*
    |--------------------------------------------------------------------------
    | Projects Management
    |--------------------------------------------------------------------------
    */

    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Skills Management
    |--------------------------------------------------------------------------
    */

    Route::post('/skills', [SkillController::class, 'store']);
    Route::put('/skills/{id}', [SkillController::class, 'update']);
    Route::delete('/skills/{id}', [SkillController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Blogs Management
    |--------------------------------------------------------------------------
    */

    Route::post('/blogs', [BlogController::class, 'store']);
    Route::put('/blogs/{id}', [BlogController::class, 'update']);
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | Messages Management
    |--------------------------------------------------------------------------
    */

    Route::get('/messages', [MessageController::class, 'index']);
    Route::get('/messages/{id}', [MessageController::class, 'show']);
    Route::put('/messages/{id}', [MessageController::class, 'update']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
});

     /*
    |--------------------------------------------------------------------------
    | About Me Management
    |--------------------------------------------------------------------------
    */
    Route::post('/abouts', [AboutController::class, 'store']);
    Route::put('/abouts/{id}', [AboutController::class, 'update']);
    Route::delete('/abouts/{id}', [AboutController::class, 'destroy']);

     /*
    |--------------------------------------------------------------------------
    | Services Management
    |--------------------------------------------------------------------------
    */
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);



    Route::get('/download-cv/{id}', [AboutController::class, 'downloadCv']);

