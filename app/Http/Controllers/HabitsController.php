<?php

namespace App\Http\Controllers;

use App\Models\Habits;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\StatsController;

class HabitsController extends Controller
{
    // Mostrar todos los hábitos del usuario autenticado
    public function show($id)
    {
        $user = auth('api')->user();
        if (!$user) {
            return response()->json(['Error' => 'No autorizado para ver estas tareas'], 403);
        }

        $habit = Habits::where('user_id', Auth::id())->get();

        return response()->json([
            'message' => 'succesful',
            'habit' => $habit
        ], 200);
    }

    // Crear un nuevo hábito
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $habit = Habits::create([
            'user_id' => Auth::id(),
            'title' => $validatedData['title'],
            'description' => $validatedData['description'] ?? null,
            'count' => $validatedData['count'] ?? 0,
        ]);

        $statistics = StatsController::firstOrCreate(['user_id' => Auth::id()]);
        $statistics->increment('habits_created');


        return response()->json(['habits' => $habit], 201);
    }

    // Actualizar un hábito existente (incluir suma/resta en el contador)
    public function update(Request $request, $id)
    {
        $user = auth('api')->user();

        // Verificar que el hábito pertenezca al usuario autenticado
        if (!$user) {
            return response()->json(['Error' => 'No autorizado para ver estas tareas'], 403);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'count' => 'nullable|integer', // Permitir la actualización del contador
        ]);

        $habit = Habits::findOrFail($id);

        $habit->update([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'] ?? $habit->description,
            'count' => $validatedData['count'] ?? $habit->count,
        ]);

        return response()->json(['habits' => $habit, 'user' => $user], 200);
    }

    // Eliminar un hábito
    public function destroy($id)
    {
        $habit = Habits::findOrFail($id);

        // Verificar que el hábito pertenezca al usuario autenticado
        if ($habit->user_id != Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $habit->delete();

        return response()->json(['message' => 'Habit deleted successfully'], 200);
    }

    // Incrementar el contador de un hábito
    public function incrementCount($id)
    {
        $habit = Habits::findOrFail($id);
        $user = auth('api')->user();
        $statistics = StatsController::firstOrCreate(['user_id' => $user->id]);

        if ($habit->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para modificar este hábito'], 403);
        }

        $habit->increment('count');
        // Ganar EXP
        $user->addExperience(10); // Método previamente definido para manejar la EXP


        // Incrementar experiencia total ganada
        $statistics->updateStatistics('total_experience', 10);

        return response()->json(['message' => 'Hábito incrementado y EXP ganada', 'habit' => $habit, 'user' => $user], 200);
    }

    public function decrementCount($id)
    {
        $user = auth('api')->user();

        $habit = Habits::findOrFail($id);

        if ($habit->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para modificar este hábito'], 403);
        }
        $habit->decrement('count');
        // Perder vida (15% de la vida actual)
        $damage = 15;
        $user->setCurrentLife($damage); // Método previamente definido para manejar la vida

        return response()->json(['message' => 'Hábito decrementado y vida reducida', 'habit' => $habit, 'user' => $user], 200);
    }
}
