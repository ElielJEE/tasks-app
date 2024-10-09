<?php

namespace App\Http\Controllers;

use App\Models\Users;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRegisterRequest;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    // Método para actualizar el perfil del usuario
    public function update(UserRegisterRequest $request)
    {
        $user = Auth::user();
        $validateUser = $request->validated();
        // Si se sube un avatar, guardarlo en el almacenamiento y actualizar el campo avatar
        if ($validateUser->hasFile('avatar')) {
            // Borrar el avatar anterior si existe
            if ($user->avatar) {
                Storage::delete('public/avatars/' . $user->avatar);
            }

            // Guardar el nuevo avatar
            $avatarName = time() . '.' . $validateUser->avatar->extension();
            $validateUser->avatar->storeAs('avatars', $avatarName, 'public');

            // Actualizar el campo avatar
            $user->avatar = $avatarName;
        }

        // Actualizar los campos del usuario
        $user->name = $validateUser->name;
        $user->email = $validateUser->email;

        if ($validateUser->password) {
            $user->password = Hash::make($validateUser->password);
        }

        $user->save();

        return response()->json($user, 200);
    }

    public function destroy(Request $request)
    {
        $user = Auth::user();

        // $request->validate([
        //     'password' => 'required|string'
        // ]);

        // if (!Hash::check($request->password, $user->password)) {
        //     return response()->json(['error' => 'La contraseña es incorrecta'], 403);
        // }
        
        $user->delete();

        return response()->json(['message' => 'Cuenta eliminada exitosamente'], 200);
    }
}