<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // LOGIN
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();

        // remove old tokens
        $user->tokens()->delete();

        $token = $user->createToken('admin-token')->plainTextToken;

       return response()->json([
        'message' => 'Logged in successfully',
        'user' => $user,
        'token' => $token
    ]);
    }

    // LOGOUT
   public function logout(Request $request)
{
    $request->user()->tokens()->delete();

    return response()->json([
        'message' => 'Logged out successfully'
    ]);
}

    // GET AUTH USER
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
