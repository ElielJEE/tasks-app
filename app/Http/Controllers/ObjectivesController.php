<?php

namespace App\Http\Controllers;

use App\Models\Objectives;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ObjectivesController extends Controller
{
    // Mostrar todos los objetivos relacionados con una quest
    public function showObjectivesByQuest($quest_id)
    {
        $objectives = Objective::where('quest_id', $quest_id)->get();

        if ($objectives->isEmpty()) {
            return response()->json(['message' => 'No objectives found for this quest'], 200);
        }

        return response()->json($objectives, 200);
    }

    // Mostrar todos los objetivos relacionados con una task
    public function showObjectivesByTask($task_id)
    {
        $objectives = Objective::where('task_id', $task_id)->get();

        if ($objectives->isEmpty()) {
            return response()->json(['message' => 'No objectives found for this task'], 200);
        }

        return response()->json($objectives, 200);
    }

    public function storeObjectiveForTask(Request $request, $task_id)
    {
        // Lógica para crear un objetivo para una task
        $objective = new Objective();
        $objective->task_id = $task_id;
        $objective->name = $request->name;
        // Completa la lógica de guardado

        $objective->save();

        return response()->json(['message' => 'Objective created for task'], 201);
    }

    public function updateObjectiveForTask(Request $request, $task_id, $objective_id)
    {
        // Lógica para actualizar un objetivo de task
        $objective = Objective::where('task_id', $task_id)->findOrFail($objective_id);
        $objective->name = $request->name;
        // Completa la lógica de actualización

        $objective->save();

        return response()->json(['message' => 'Objective updated for task'], 200);
    }

    public function deleteObjectiveForTask($task_id, $objective_id)
    {
        // Lógica para eliminar un objetivo de task
        $objective = Objective::where('task_id', $task_id)->findOrFail($objective_id);
        $objective->delete();

        return response()->json(['message' => 'Objective deleted for task'], 200);
    }

    public function storeObjectiveForQuest(Request $request, $quest_id)
    {
        // Lógica para crear un objetivo para una quest
        $objective = new Objective();
        $objective->quest_id = $quest_id;
        $objective->name = $request->name;
        // Completa la lógica de guardado

        $objective->save();

        return response()->json(['message' => 'Objective created for quest'], 201);
    }

    public function updateObjectiveForQuest(Request $request, $quest_id, $objective_id)
    {
        // Lógica para actualizar un objetivo de quest
        $objective = Objective::where('quest_id', $quest_id)->findOrFail($objective_id);
        $objective->name = $request->name;
        // Completa la lógica de actualización

        $objective->save();

        return response()->json(['message' => 'Objective updated for quest'], 200);
    }

    public function deleteObjectiveForQuest($quest_id, $objective_id)
    {
        // Lógica para eliminar un objetivo de quest
        $objective = Objective::where('quest_id', $quest_id)->findOrFail($objective_id);
        $objective->delete();

        return response()->json(['message' => 'Objective deleted for quest'], 200);
    }

}
