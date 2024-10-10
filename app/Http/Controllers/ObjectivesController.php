<?php

namespace App\Http\Controllers;

use App\Models\Objectives;
use App\Http\Controllers\Controller;
use App\Models\Quests;
use App\Models\Tasks;
use Illuminate\Http\Request;

class ObjectivesController extends Controller
{
    public function index($parentType, $parentId)
    {
        // Verificar si el parentType es válido (task o quest)
        if (!in_array($parentType, ['task', 'quest'])) {
            return response()->json(['error' => 'Tipo de entidad inválida'], 400);
        }

        // Obtener los objetivos de la Task o Quest, según el tipo
        $objectives = Objective::where("{$parentType}_id", $parentId)->get();

        if ($objectives->isEmpty()) {
            return response()->json(['message' => 'No objectives found'], 200);
        }

        return response()->json([
            'message' => 'Objectives retrieved successfully',
            'objectives' => $objectives
        ], 200);
    }

    /**
     * Actualizar un objetivo.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $objective = Objective::findOrFail($id);

        // Asegurarse de que el usuario sea el propietario del objetivo
        if (!Auth::check() || !in_array(Auth::id(), [$objective->task->user_id ?? null, $objective->quest->user_id ?? null])) {
            return response()->json(['error' => 'No autorizado para editar este objetivo'], 403);
        }

        // Actualizar el objetivo
        $objective->update($validatedData);

        return response()->json(['message' => 'Objective updated successfully', 'objective' => $objective], 200);
    }

    /**
     * Eliminar un objetivo.
     */
    public function destroy($id)
    {
        $objective = Objective::findOrFail($id);

        // Asegurarse de que el usuario sea el propietario del objetivo
        if (!Auth::check() || !in_array(Auth::id(), [$objective->task->user_id ?? null, $objective->quest->user_id ?? null])) {
            return response()->json(['error' => 'No autorizado para eliminar este objetivo'], 403);
        }

        // Eliminar el objetivo
        $objective->delete();

        return response()->json(['message' => 'Objective deleted successfully'], 200);
    }

}
