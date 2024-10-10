<?php

namespace App\Http\Controllers;

use App\Models\Objectives;
use App\Http\Controllers\Controller;
use App\Models\Quests;
use App\Models\Tasks;
use Illuminate\Http\Request;

class ObjectivesController extends Controller
{
    // Mostrar todos los objetivos de una tarea
    public function indexForTask(Tasks $task)
    {
        return response()->json($task->objectives);
    }

    // Mostrar todos los objetivos de una quest
    public function indexForQuest(Quests $quest)
    {
        return response()->json($quest->objectives);
    }

    // Crear un objetivo para una tarea
    public function storeForTask(Request $request, Tasks $task)
    {
        $request->validate([
            'description' => 'required|string|max:255',
        ]);

        $objective = $task->objectives()->create([
            'description' => $request->description,
            'completed' => false,
        ]);

        return response()->json($objective, 201);
    }

    // Crear un objetivo para una quest
    public function storeForQuest(Request $request, Quests $quest)
    {
        $request->validate([
            'description' => 'required|string|max:255',
        ]);

        $objective = $quest->objectives()->create([
            'description' => $request->description,
            'completed' => false,
        ]);

        return response()->json($objective, 201);
    }

    // Actualizar un objetivo
    public function update(Request $request, Objectives $objective)
    {
        $request->validate([
            'description' => 'required|string|max:255',
            'completed' => 'boolean',
        ]);

        $objective->update($request->all());

        return response()->json($objective);
    }

    // Eliminar un objetivo
    public function destroy(Objectives $objective)
    {
        $objective->delete();

        return response()->json(null, 204);
    }
}
