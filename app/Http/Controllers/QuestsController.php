<?php

namespace App\Http\Controllers;

use App\Models\Quests;
use App\Models\Objetives;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuestsController extends Controller
{
    // Mostrar todas las quests del usuario autenticado
    public function show($id)
    {
        // Verificamos si el usuario autenticado está accediendo a sus propias misiones
        $user = auth('api')->user();
        if ($id != $user->id) {
            return response()->json(['Error' => 'No autorizado para ver estas Quests'], 403);
        }

        // Obtener todas las quests asociadas a este usuario
        $quests = Quests::with('objectives') // Carga los objetivos relacionados
                    ->where('user_id', Auth::id())
                    ->get();
        
        if ($quests->isEmpty()) {
            return response()->json(['message' => 'No quests found'], 200);
        }
        
        return response()->json([
            'message' => 'Quests',
            'quests' => $quests
        ]);
    }

    // Crear una nueva quest
    public function store(Request $request)
    {
        // Validar los datos de entrada (los objetivos son opcionales)
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'difficulty' => 'required|in:Facil,Medio,Dificil',
            'status' => 'nullable|in:activo,completo',
            'start_date' => 'required|date|after_or_equal:today', // La fecha de inicio no puede ser en el pasado
            'end_date' => 'required|date|after:start_date', // La fecha de fin debe ser posterior a la fecha de inicio
            'objectives' => 'array|nullable', // Objetivos son opcionales
            'objectives.*.description' => 'required_with:objectives|string|max:255', // Solo si se envían objetivos
            'objectives.*.completed' => 'required_with:objectives|boolean', // Estado de completado por defecto en false
        ]);

        // Crear la quest asociada al usuario autenticado
        $quest = Quests::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status ?? 'active',
            'start_date' => $validatedData['start_date'],
            'end_date' => $validatedData['end_date'],
        ]);

        // Crear los objetivos asociados a la Quest (si existen)
        if (!empty($validatedData['objectives'])) {
            foreach ($validatedData['objectives'] as $objectiveData) {
                Objectives::create([
                    'quest_id' => $quest->id,
                    'description' => $objectiveData['description'],
                    'completed' => $objectiveData['completed'] ?? false,
                ]);
            }
        }

        return response()->json(['message' => 'Quest created successfully', 'quest' => $quest], 201);
    }

    // Actualizar una quest
    public function update(Request $request, $id)
    {
        // Buscar la Quest
        $quest = Quests::findOrFail($id);

        // Verificar que la quest pertenezca al usuario autenticado
        if ($quest->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para actualizar esta quest'], 403);
        }

        // Validación de la quest y los objetivos (los objetivos son opcionales)
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:active,completed',
            'start_date' => 'nullable|date|after_or_equal:today', // Permitir modificar si la fecha aún no ha pasado
            'end_date' => 'nullable|date|after:start_date', // end_date debe ser posterior a start_date
            'objectives' => 'array|nullable', // Objetivos son opcionales
            'objectives.*.id' => 'nullable|exists:objectives,id', // Validar si el objetivo ya existe
            'objectives.*.description' => 'required_with:objectives|string|max:255', // Solo si se envían objetivos
            'objectives.*.completed' => 'required_with:objectives|boolean', // Estado del objetivo (completado o no)
        ]);

        // Actualizar la Quest
        $quest->update([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'status' => $request->status ?? 'active',
            'start_date' => $quest->start_date > now() ? $validatedData['start_date'] : $quest->start_date, // Solo actualizar si no ha pasado la fecha de inicio
            'end_date' => $validatedData['end_date'] ?? $quest->end_date,
        ]);

        // Actualizar, crear o eliminar objetivos (si existen)
        if (!empty($validatedData['objectives'])) {
            $existingObjectiveIds = [];
            foreach ($validatedData['objectives'] as $objectiveData) {
                if (isset($objectiveData['id'])) {
                    // Actualizar objetivo existente
                    $objective = Objectives::find($objectiveData['id']);
                    $objective->update([
                        'description' => $objectiveData['description'],
                        'completed' => $objectiveData['completed'] ?? false,
                    ]);
                    $existingObjectiveIds[] = $objective->id;
                } else {
                    // Crear nuevo objetivo
                    $newObjective = Objectives::create([
                        'quest_id' => $quest->id,
                        'description' => $objectiveData['description'],
                        'completed' => $objectiveData['completed'] ?? false,
                    ]);
                    $existingObjectiveIds[] = $newObjective->id;
                }
            }

            // Eliminar objetivos que no fueron enviados
            Objectives::where('quest_id', $quest->id)->whereNotIn('id', $existingObjectiveIds)->delete();
        }

        return response()->json(['message' => 'Quest and objectives updated successfully', 'quest' => $quest], 200);
    }

    // Eliminar una quest
    public function destroy($id)
    {
        // Obtener la quest
        $quest = Quests::findOrFail($id);

        // Verificar que la quest pertenezca al usuario autenticado
        if ($quest->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para eliminar esta quest'], 403);
        }

        // Eliminar la quest y sus objetivos asociados (si existen)
        $quest->objectives()->delete(); // Elimina los objetivos asociados
        $quest->delete(); // Elimina la quest

        return response()->json(['message' => 'Quest and its objectives deleted successfully'], 200);
    }
}
