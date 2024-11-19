<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRegisterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\StatsController;

class UsersController extends Controller
{
    // Método para actualizar el perfil del usuario
    public function update(UserRegisterRequest $request)
    {
        try {
            $user = auth('api')->user();
            $validateUser = $request->validated();
            // Guardar Imagen si existe
            if ($request->hasFile('avatar')) {
                $request->validate([
                    'avatar' => 'image|mimes:jpeg,png,jpg,gif|max:100048', // Validación mejorada del avatar
                ]);
                // Borrar el avatar anterior si existe
                if ($user->avatar && Storage::exists('public/storage/avatars' . $user->avatar)) {
                    Storage::delete('public/storage/avatars' . $user->avatar);
                }

                // Guardar el nuevo avatar
                $avatarName = time() . '.' . $request->file('avatar')->extension();
                $request->file('avatar')->storeAs('avatars', $avatarName, 'public');

                // Actualizar el campo avatar
                $user->avatar = Storage::url('avatars/' . $avatarName);
                /* $user->avatar = 'avatars/' . $avatarName; */
            }

            // Actualizar los campos del usuario
            if (isset($validateUser['name'])) {
                $user->name = $validateUser['name'];
            }

            if (isset($validateUser['displayname'])) {
                $user->displayname = $validateUser['displayname'];
            }

            if (isset($validateUser['email'])) {
                $user->email = $validateUser['email'];
            }

            if ($request->filled('password')) {
                $user->password = Hash::make($validateUser['password']);
            }

            $user->save();

            return response()->json($user, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al subir la imagen: ' . $e->getMessage()], 500);
        }
    }

    // Método para añadir experiencia
    public function ReturnExp($exp)
    {
        // Retornar la respuesta en porcentaje
        $expPercentage = ($user->xp / $user->calculateExpForNextLevel()) * 100;

        return response()->json(['Experience' => floor($expPercentage)], 200);
    }

    // Calcular el EXP necesario para el próximo nivel
    private function calculateExpForNextLevel($level)
    {
        return (int) floor(50 * pow(1.25, $level));
    }

    private function updateStatistics($user, $exp)
    {
        $statistics = Stats::firstOrCreate(['user_id' => $user->id]);

        $statistics->increment('total_experience', $exp);
        $statistics->current_level = $user->level;
        $statistics->save();
    }

    public function setCurrentLife($damage)
    {
        $user = auth('api')->user();
        $user->hp -= (int) $damage;

        if ($user->hp <= 0) {
            $user->hp = $user->maxhp;
            if ($user->level > 1) {
                $user->level--;
            }
        }

        $user->save();

        return response()->json(['life' => ($user->hp / $user->maxhp) * 100], 200);
    }

    public function destroy(Request $request)
    {
        $user = auth('api')->user();
        $user->delete();
    }
}
