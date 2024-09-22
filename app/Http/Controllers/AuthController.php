<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(UserRegisterRequest $request) {
        $validateData = $request->validated();

        $user = User::create([
            'name' => $validateData['name'],
            'email' => $validateData['email'],
            'password' => bcrypt($validateData['password']),
        ]);

        $token = auth('api')->login($user);
        return $this->respondWithToken($token);
    }


    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function user()
    {
        return response()->json(auth('api')->user());
    }

     // Método para actualizar el perfil del usuario
     public function update(Request $request)
     {
         $user = Auth::user();
 
         // Validar los datos de entrada
         $request->validate([
             'name' => 'required|string|max:255',
             'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
             'password' => 'nullable|string|min:8|confirmed',
             'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',  // Validar la imagen
         ]);
 
         // Si se sube un avatar, guardarlo en el almacenamiento y actualizar el campo avatar
         if ($request->hasFile('avatar')) {
             // Borrar el avatar anterior si existe
             if ($user->avatar) {
                 Storage::delete('public/avatars/' . $user->avatar);
             }
 
             // Guardar el nuevo avatar
             $avatarName = time() . '.' . $request->avatar->extension();
             $request->avatar->storeAs('avatars', $avatarName, 'public');
 
             // Actualizar el campo avatar
             $user->avatar = $avatarName;
         }
 
         // Actualizar los campos del usuario
         $user->name = $request->name;
         $user->email = $request->email;
 
         if ($request->password) {
             $user->password = Hash::make($request->password);
         }
 
         $user->save();
 
         return response()->json($user, 200);
     }

    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ]);
    }
}