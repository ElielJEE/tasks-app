<?php

namespace App\Http\Controllers;

use App\Models\Habits;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HabitsController extends Controller
{
    // Mostrar todos los hábitos del usuario autenticado
    public function show($id)
    {
        $habit = Habits::findOrFail($id);

        // Verificar que el hábito pertenece al usuario autenticado
        if ($habit->user_id != Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json([
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
        ]);

        return response()->json($habit, 201);
    }

    // Actualizar un hábito existente (incluir suma/resta en el contador)
    public function update(Request $request, $id)
    {
        $habit = Habits::findOrFail($id);

        // Verificar que el hábito pertenezca al usuario autenticado
        if ($habit->user_id != Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'count' => 'nullable|integer', // Permitir la actualización del contador
        ]);

        $habit->update([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'] ?? $habit->description,
            'count' => $validatedData['count'] ?? $habit->count,
        ]);

        return response()->json($habit, 200);
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
        $habit = Habit::findOrFail($id);

        if ($habit->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para modificar este hábito'], 403);
        }

        $habit->increment('count');
        // Ganar EXP
        $user = Auth::user();
        $user->addExperience(10); // Método previamente definido para manejar la EXP

        return response()->json(['message' => 'Hábito incrementado y EXP ganada', 'habit' => $habit], 200);
    }

    // Decrementar el contador de un hábito
    public function decrementCount($id)
    {
        $habit = Habit::findOrFail($id);

        if ($habit->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para modificar este hábito'], 403);
        }

         // No permitir valores negativos en el contador
        if ($habit->count > 0) {
            $habit->decrement('count');

            // Perder vida (15% de la vida actual)
            $user = Auth::user();
            $damage = 15;
            $user->setCurrentLife($damage); // Método previamente definido para manejar la vida

            return response()->json(['message' => 'Hábito decrementado y vida reducida', 'habit' => $habit], 200);
        }

        return response()->json(['message' => 'El contador no puede ser negativo'], 400);
    }
}
