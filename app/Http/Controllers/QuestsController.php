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
        $quests = Quest::with('objectives') // Carga los objetivos relacionados
                    ->where($id, Auth::id())
                    ->get();
        
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
            'status' => 'nullable|in:active,completed',
            'objectives' => 'array|required', // Validar que los objetivos están presentes
            'objectives.*.description' => 'required|string|max:255', // Cada objetivo debe tener una descripción
            'objectives.*.completed' => 'boolean', // Cada objetivo puede tener estado completado (por defecto falso)
        
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

    public function update(Request $request, $id)
    {
        // Buscar la Quest
        $quest = Quest::findOrFail($id);

        // Verificar que la quest pertenezca al usuario autenticado
        if ($quest->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para actualizar esta quest'], 403);
        }

        // Validación de la quest y los objetivos
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:active,completed',
            'objectives' => 'array|required', // Validar que los objetivos están presentes
            'objectives.*.id' => 'nullable|exists:objectives,id', // Validar si el objetivo ya existe
            'objectives.*.description' => 'required|string|max:255', // Descripción del objetivo
            'objectives.*.completed' => 'boolean', // Estado del objetivo (completado o no)
        ]);

        // Actualizar la Quest
        $quest->update([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'status' => $request->status ?? 'pending'
        ]);

        // Actualizar, crear o eliminar objetivos
        $existingObjectiveIds = [];
        foreach ($validatedData['objectives'] as $objectiveData) {
            if (isset($objectiveData['id'])) {
                // Actualizar objetivo existente
                $objective = Objective::find($objectiveData['id']);
                $objective->update([
                    'description' => $objectiveData['description'],
                    'completed' => $objectiveData['completed'] ?? false,
                ]);
                $existingObjectiveIds[] = $objective->id;
            } else {
                // Crear nuevo objetivo
                $newObjective = Objective::create([
                    'quest_id' => $quest->id,
                    'description' => $objectiveData['description'],
                    'completed' => $objectiveData['completed'] ?? false,
                ]);
                $existingObjectiveIds[] = $newObjective->id;
            }
        }

        // Eliminar objetivos que no fueron enviados
        Objective::where('quest_id', $quest->id)->whereNotIn('id', $existingObjectiveIds)->delete();

        return response()->json(['message' => 'Quest and objectives updated successfully', 'quest' => $quest], 200);
    }

    // Eliminar una quest
    public function destroy($id)
    {
        // Obtener la quest
        $quest = Quest::findOrFail($id);

        // Verificar que la quest pertenezca al usuario autenticado
        if ($quest->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para eliminar esta quest'], 403);
        }

        // Eliminar la quest y sus objetivos
        $quest->objectives()->delete(); // Elimina los objetivos asociados
        $quest->delete(); // Elimina la quest

        return response()->json(['message' => 'Quest and its objectives deleted successfully'], 200);
    }
}
