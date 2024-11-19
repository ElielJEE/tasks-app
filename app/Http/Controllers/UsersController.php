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
            // Si se sube un avatar, guardarlo en el almacenamiento y actualizar el campo avatar
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
    public function addExperience($exp)
    {
        $user = auth('api')->user();
        $user->exp += $exp;
        // Incrementar la estadística de hábitos creados
        $statistics = UserStatistic::firstOrCreate(['user_id' => Auth::id()]);
        $statistics->increment('total_experience', $exp);

        $this->exp += $exp;
        $expForNextLevel = $this->calculateExpForNextLevel();

        // Subir de nivel si el EXP excede el necesario
        while ($user->experience >= $expForNextLevel) {
            $user->level++;
            $user->exp -= $expForNextLevel;
            $expForNextLevel = $this->calculateExpForNextLevel();

            // Incrementar la estadística de hábitos creados
            $statistics = UserStatistic::firstOrCreate(['user_id' => Auth::id()]);
            $statistics->increment('current_level', $this->level);
        }

        $this->save();
        return response()->json(['Experience' => ($user->exp / $this->calculateExpForNextLevel()) * 100], 200);
    }

    // Calcular el EXP necesario para el próximo nivel
    private function calculateExpForNextLevel()
    {
        $user = auth('api')->user();
        // Incremento del 25% por nivel
        return (int)(50 * pow(1.25, $user->level - 1));
    }
    
    // Calcula el porcentaje de vida
    public function getLifePercentageAttribute()
    {
        $user = auth('api')->user();
        return response()->json(['life' => ($user->hp / $user->maxhp) * 100], 200);
    }
    
    public function setCurrentLife($damage)
    {
        $user = auth('api')->user();
        $user->hp -= $damage;
        
        $this->save();
        $this->checkLife();
        $this->getLifePercentageAttribute();
        // return response()->json(['life' => ($this->hp / $this->maxhp)], 200);
    }
    
    // Verifica si la vida ha llegado a 0
    public function checkLife()
    {
        $user = auth('api')->user();
        if ($user->hp <= 0) {
            $user->hp = $user->maxhp; // Rellenar vida al máximo
            if ($user->level > 1) {
                $user->level -= 1; // Reducir un nivel si está por encima de 1
            }
        }
        $this->save();
    }

    public function destroy(Request $request)
    {
        $user = auth('api')->user();

        // $request->validate([
        //     'password' => 'required|string'
        // ]);

        // if (!Hash::check($request->password, $user->password)) {
        //     return response()->json(['error' => 'La contraseña es incorrecta'], 403);
        // }

        $this->delete();

        return response()->json(['message' => 'Cuenta eliminada exitosamente'], 200);
    }
}
