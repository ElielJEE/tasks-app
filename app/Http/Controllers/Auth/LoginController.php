<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            // Autenticación exitosa
            $request->session()->regenerate();
            
            return response()->json([
                'message' => 'Login successful',
                'user' => Auth::user(),
            ], 200);
        }

        return response()->json([
            'message' => 'Login failed',
            'errors' => ['email' => __('auth.failed')],
        ], 422);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout successful'
        ], 200);
    }
}
