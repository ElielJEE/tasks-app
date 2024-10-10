<?php

namespace App\Http\Controllers;

use App\Models\Quests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuestsController extends Controller
{
    // Mostrar todas las quests del usuario autenticado
    public function show($id)
    {
        // Verificamos si el usuario autenticado está accediendo a sus propias tareas
        $user = auth('api')->user();
        if ($id != $user->id) {
            return response()->json(['Error' => 'No autorizado para ver estas Quest'], 403);
        }

        // Obtener todas las tareas asociadas a este usuario
        $quests = Quests::where('user_id', $id)->all();
        
        if ($tasks->isEmpty()) {
            return response()->json(['message' => 'No quests found'], 200);
        }
        
        return response()->json([
            'message' => 'Quests',
            'quest' => $quests
        ]);
    }

    // Crear una nueva quest
    public function store(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:active,completed'
        ]);

        // Crear la quest asociada al usuario autenticado
        $quest = Quests::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status ?? 'active',
        ]);

        // // Validación de la quest
        // $validatedData = $request->validate([
        //     'title' => 'required|string|max:255',
        //     'description' => 'nullable|string',
        //     'objectives' => 'array|required', // Validar que los objetivos están presentes
        //     'objectives.*.name' => 'required|string|max:255', // Cada objetivo debe tener un nombre
        // ]);

        // // Crear la Quest
        // $quest = Quest::create([
        //     'user_id' => Auth::id(),
        //     'title' => $validatedData['title'],
        //     'description' => $validatedData['description'],
        // ]);

        // // Crear los Objetivos asociados a la Quest
        // foreach ($validatedData['objectives'] as $objectiveData) {
        //     Objective::create([
        //         'quest_id' => $quest->id,
        //         'name' => $objectiveData['name'],
        //     ]);
        // }

        return response()->json($quest, 201);
    }

    // Actualizar una quest existente
    public function update(Request $request, Quests $quest)
    {
        // Verificar que la quest pertenece al usuario autenticado
        if ($quest->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Validar los datos de entrada
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:active,completed'
        ]);

        // Actualizar la quest
        $quest->update($request->all());

        return response()->json($quest);
    }

    // Eliminar una quest
    public function destroy(Quests $quest)
    {
        // Verificar que la quest pertenece al usuario autenticado
        if ($quest->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Eliminar la quest
        $quest->delete();

        return response()->json(null, 204);
    }
}
