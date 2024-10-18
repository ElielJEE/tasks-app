<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use App\Models\Objetives;
use App\Http\Controllers\Controller;
use App\Models\Objectives;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    // Mostrar tareas del usuario autenticado o de un usuario específico
    public function show($id)
    {
        // Verificamos si el usuario autenticado está accediendo a sus propias tareas
        $user = auth('api')->user();
        if ($id != $user->id) {
            return response()->json(['Error' => 'No autorizado para ver estas tareas'], 403);
        }

        // Obtener todas las tareas asociadas a este usuario
        $tasks = Tasks::where('user_id', Auth::id())
            ->with('objectives')  // Cargar los objetivos si existen
            ->get();

        if ($tasks->isEmpty()) {
            return response()->json(['message' => 'No tasks found'], 200);
        }

        return response()->json([
            'message' => 'Task',
            'task' => $tasks
        ]);
    }

    // Crear una nueva tarea
    public function store(Request $request)
    {
        // Validación de la task y los objetivos (los objetivos son opcionales)
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'difficulty' => 'required|in:facil,medio,dificil',
            'estimated_time' => 'nullable|integer',
            'status' => 'nullable|in:pendiente,completo',
            'objectives' => 'array|nullable', // Ahora los objetivos son opcionales
            'objectives.*.description' => 'required_with:objectives|string|max:255', // Solo requerido si se envían objetivos
            'objectives.*.completed' => 'required_with:objectives|boolean', // Puede tener estado completado (por defecto falso)
        ]);

        // Crear la Task
        $task = Tasks::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'difficulty' => $request->difficulty,
            'estimated_time' => $request->estimated_time??24,
            'status' => $request->status ?? 'pendiente'
        ]);

        // Crear los Objetivos asociados a la Task (si existen)
        if (!empty($validatedData['objectives'])) {
            foreach ($validatedData['objectives'] as $objectiveData) {
                Objectives::create([
                    'task_id' => $task->id,
                    'description' => $objectiveData['description'],
                    'completed' => $objectiveData['completed'] ?? false, // Si no se especifica, se pone en false
                ]);
            }
        }

        return response()->json(['message' => 'OK', 'task' => $task], 201);
    }

    // Actualizar una tarea
    public function update(Request $request, $id)
    {
        // Buscar la Task
        $task = Tasks::findOrFail($id);

        // Verificar que la task pertenezca al usuario autenticado
        if ($task->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para actualizar esta task'], 403);
        }

        // Validación de la task y los objetivos (los objetivos son opcionales)
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'difficulty' => 'required|in:easy,medium,hard',
            'estimated_time' => 'required|integer',
            'status' => 'nullable|in:pending,completed',
            'objectives' => 'array|nullable', // Objetivos opcionales
            'objectives.*.id' => 'nullable|exists:objectives,id', // Validar si el objetivo ya existe
            'objectives.*.description' => 'required_with:objectives|string|max:255', // Requerido si se envían objetivos
            'objectives.*.completed' => 'required_with:objectives|boolean', // Estado del objetivo
        ]);

        // Actualizar la Task
        $task->update([
            'title' => $request->title,
            'description' => $request->description,
            'difficulty' => $request->difficulty,
            'estimated_time' => $request->estimated_time,
            'status' => $request->status ?? 'pending'
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
                        'task_id' => $task->id,
                        'description' => $objectiveData['description'],
                        'completed' => $objectiveData['completed'] ?? false,
                    ]);
                    $existingObjectiveIds[] = $newObjective->id;
                }
            }

            // Eliminar objetivos que no fueron enviados
            Objectives::where('task_id', $task->id)->whereNotIn('id', $existingObjectiveIds)->delete();
        }

        return response()->json(['message' => 'Task and objectives updated successfully', 'task' => $task], 200);
    }

    // Eliminar una tarea
    public function destroy($id)
    {
        // Obtener la task
        $task = Tasks::findOrFail($id);

        // Verificar que la task pertenezca al usuario autenticado
        if ($task->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para eliminar esta task'], 403);
        }

        // Eliminar la task y sus objetivos asociados (si existen)
        $task->objectives()->delete(); // Elimina los objetivos asociados
        $task->delete(); // Elimina la task

        return response()->json(['message' => 'Task and its objectives deleted successfully'], 200);
    }
}
