<?php

namespace App\Http\Controllers;

use App\Models\Quests;
use App\Models\Objetives;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Objectives;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\StatsController;

class QuestsController extends Controller
{
    // Mostrar todas las quests del usuario autenticado
    public function show($id)
    {
        // Verificamos si el usuario autenticado está accediendo a sus propias misiones
        $user = auth('api')->user();
        if (!$user) {
            return response()->json(['Error' => 'No autorizado para ver estas Quests'], 403);
        }

        // Obtener todas las quests asociadas a este usuario
        $quests = Quests::where('user_id', Auth::id())->with('objectives')->get();

        if ($quests->isEmpty()) {
            return response()->json(['message' => 'No quests found'], 200);
        }

        return response()->json([
            'message' => 'Succesful',
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
            'difficulty' => 'required|in:facil,medio,dificil',
            'status' => 'nullable|in:activo,completo',
            'start_date' => 'required|date|after_or_equal:today', // La fecha de inicio no puede ser en el pasado
            'end_date' => 'required|date|after:start_date', // La fecha de fin debe ser posterior a la fecha de inicio
            'objectives' => 'array|nullable', // Objetivos son opcionales
            'objectives.*.description' => 'required_with:objectives|string|max:255', // Solo si se envían objetivos
            'objectives.*.completed' => 'nullable|in:pendiente,completado', // Estado de completado por defecto en false
        ]);

        // Crear la quest asociada al usuario autenticado
        $quest = Quests::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description,
            'difficulty' => $request->difficulty,
            'status' => $request->status ?? 'activo',
            'start_date' => $validatedData['start_date'],
            'end_date' => $validatedData['end_date'],
        ]);

        // Crear los objetivos asociados a la Quest (si existen)
        if (!empty($validatedData['objectives'])) {
            foreach ($validatedData['objectives'] as $objectiveData) {
                Objectives::create([
                    'related_type' => Quests::class,
                    'related_id' => $quest->id,
                    'description' => $objectiveData['description'],
                    'completed' => $objectiveData['completed'] ?? 'pendiente',
                ]);
            }
        }

        $questWithObjectives = Quests::with('objectives')->find($quest->id);

        $statistics = StatsController::firstOrCreate(['user_id' => Auth::id()]);
        $statistics->increment('quests_created');

        return response()->json(['message' => 'OK', 'quests' => $questWithObjectives], 201);
    }

    // Actualizar una quest
    public function update(Request $request, $id)
    {
        // Buscar la Quest
        $quest = Quests::findOrFail($id);
        $user = auth('api')->user();

        // Verificar que la quest pertenezca al usuario autenticado
        if ($quest->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para actualizar esta quest'], 403);
        }

        // Validación de la quest y los objetivos (los objetivos son opcionales)
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:activo,completo',
            'start_date' => 'nullable|date|after_or_equal:today', // Permitir modificar si la fecha aún no ha pasado
            'end_date' => 'nullable|date|after:start_date', // end_date debe ser posterior a start_date
            'objectives' => 'array|nullable', // Objetivos son opcionales
            'objectives.*.id' => 'nullable|exists:objectives,id', // Validar si el objetivo ya existe
            'objectives.*.description' => 'required_with:objectives|string|max:255', // Solo si se envían objetivos
            'objectives.*.completed' => 'nullable|in:pendiente,completado', // Estado del objetivo (completado o no)
        ]);

        // Actualizar la Quest
        $quest->update([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'status' => $request->status ?? 'activo',
            'start_date' => $quest->start_date > now() ? $validatedData['start_date'] : $quest->start_date, // Solo actualizar si no ha pasado la fecha de inicio
            'end_date' => $validatedData['end_date'] ?? $quest->end_date,
        ]);

        if ($quest->status === 'completo') {
            $this->completeQuest($quest->id);
        }

        // Actualizar, crear o eliminar objetivos (si existen)
        if (isset($validatedData['objectives'])) {
            if (!empty($validatedData['objectives'])) {
                $existingObjectiveIds = [];
                foreach ($validatedData['objectives'] as $objectiveData) {
                    if (isset($objectiveData['id'])) {
                        // Actualizar objetivo existente
                        $objective = Objectives::find($objectiveData['id']);
                        $objective->update([
                            'description' => $objectiveData['description'],
                            'completed' => $objectiveData['completed'] ?? 'pendiente',
                        ]);
                        $existingObjectiveIds[] = $objective->id;
                    } else {
                        // Crear nuevo objetivo
                        $newObjective = Objectives::create([
                            'related_type' => Quests::class,
                            'related_id' => $quest->id,
                            'description' => $objectiveData['description'],
                            'completed' => $objectiveData['completed'] ?? 'pendiente',
                        ]);
                        $existingObjectiveIds[] = $newObjective->id;
                    }
                }

                // Eliminar objetivos que no fueron enviados
                Objectives::where('related_id', $quest->id)->whereNotIn('id', $existingObjectiveIds)->delete();
            } else {
                Objectives::where('related_id', $quest->id)->delete();
            }
        }

        $questWithObjectives = Quests::with('objectives')->find($quest->id);
        return response()->json(['message' => 'Quest and objectives updated successfully', 'quest' => $questWithObjectives, 'user' => $user], 200);
    }

    public function completeQuest($id)
    {
        $quest = Quests::findOrFail($id);
        $user = auth('api')->user();

        if ($quest->status === 'pendiente') {
            return response()->json(['message' => 'La quest sigue pendiente'], 400);
        }

        // Determinar EXP por dificultad
        $expMap = ['Facil' => 10, 'Medio' => 15, 'Dificil' => 20];
        $exp = $expMap[$quest->difficulty] ?? 10;

        // Añadir EXP al usuario
        /* $user = Auth::user(); */
        $user->addExperience($exp);

        $statistics = StatsController::firstOrCreate(['user_id' => Auth::id()]);
        $statistics->increment('quests_completed');

        return response()->json(['message' => 'Quest completada', 'user' => $user]);
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
