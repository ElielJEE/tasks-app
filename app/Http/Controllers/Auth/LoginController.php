<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!$token = JWTAuth::attempt($credentials)) {
            // Autenticación exitosa
            /* session()->regenerate(); */
            Log::info('Login failed for user: ' . $request->input('email'));
            
            return response()->json([
                'message' => 'Login failed',
                'errors' => ['email' => __('auth.failed')],
            ], 422);
        }
        
        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => Auth::user(),
        ], 200);

    }

    public function logout(Request $request)
{
    try {
        $token = JWTAuth::getToken();
        if (!$token) {
            return response()->json([
                'message' => 'Token not provided'
            ], 400);
        }

        // Invalidate the token to log out the user
        JWTAuth::invalidate($token);

        // Optionally, log out from the Laravel session as well
        Auth::logout();

        return response()->json([
            'message' => 'Logout successful'
        ], 200);
    } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
        return response()->json([
            'message' => 'Token is invalid'
        ], 401);
    } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
        return response()->json([
            'message' => 'Could not log out, token invalid'
        ], 500);
    }
}
}
