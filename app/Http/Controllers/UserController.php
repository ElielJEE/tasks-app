<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // Este método devuelve los detalles del usuario autenticado
    public function getUser()
    {
        $user = Auth::user(); // Obtiene el usuario autenticado

        if ($user) {
            return response()->json([
                'status' => 'success',
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not authenticated',
            ], 401);
        }
    }
}
