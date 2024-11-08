<?php

namespace App\Http\Controllers;

use App\Models\Habits;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        return response()->json(['habits' => $habit], 200);
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

        if ($habit->user_id != Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $habit->increment('count');

        return response()->json(['message' => 'Habit count incremented', 'habit' => $habit], 200);
    }

    // Decrementar el contador de un hábito
    public function decrementCount($id)
    {
        $habit = Habits::findOrFail($id);

        if ($habit->user_id != Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $habit->decrement('count');

        return response()->json(['habit' => $habit], 200);
    }
}
