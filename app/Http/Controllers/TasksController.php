<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use App\Http\Controllers\Controller;
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
        $tasks = Task::with('objectives') // Carga los objetivos relacionados
        ->where($id, Auth::id())
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
        // Validación de la task y los objetivos
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'difficulty' => 'required|in:easy,medium,hard',
            'estimated_time' => 'nullable|integer',
            'status' => 'nullable|in:pending,completed',
            'objectives' => 'array|required', // Validar que los objetivos están presentes
            'objectives.*.description' => 'required|string|max:255', // Cada objetivo debe tener una descripción
            'objectives.*.completed' => 'boolean', // Cada objetivo puede tener estado completado (por defecto falso)
        ]);

        // Crear la Task
        $task = Task::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'difficulty' => $request->difficulty,
            'estimated_time' => $request->estimated_time,
            'status' => $request->status ?? 'pending'
        ]);

        // Crear los Objetivos asociados a la Task
        foreach ($validatedData['objectives'] as $objectiveData) {
            Objective::create([
                'task_id' => $task->id,
                'description' => $objectiveData['description'],
                'completed' => $objectiveData['completed'] ?? false, // Si no se especifica, se pone en false
            ]);
        }

        return response()->json(['message' => 'Task created successfully with objectives', 'task' => $task], 201);
    }

    public function update(Request $request, $id)
    {
        // Buscar la Task
        $task = Task::findOrFail($id);

        // Verificar que la task pertenezca al usuario autenticado
        if ($task->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para actualizar esta task'], 403);
        }

        // Validación de la task y los objetivos
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'difficulty' => 'required|in:easy,medium,hard',
            'estimated_time' => 'required|integer',
            'status' => 'nullable|in:pending,completed',
            'objectives' => 'array|required', // Validar que los objetivos están presentes
            'objectives.*.id' => 'nullable|exists:objectives,id', // Validar si el objetivo ya existe
            'objectives.*.description' => 'required|string|max:255', // Descripción del objetivo
            'objectives.*.completed' => 'boolean', // Estado del objetivo (completado o no)
        ]);

        // Actualizar la Task
        $task->update([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'difficulty' => $request->difficulty,
            'estimated_time' => $request->estimated_time,
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
                    'task_id' => $task->id,
                    'description' => $objectiveData['description'],
                    'completed' => $objectiveData['completed'] ?? false,
                ]);
                $existingObjectiveIds[] = $newObjective->id;
            }
        }

        // Eliminar objetivos que no fueron enviados
        Objective::where('task_id', $task->id)->whereNotIn('id', $existingObjectiveIds)->delete();

        return response()->json(['message' => 'Task and objectives updated successfully', 'task' => $task], 200);
    }

    // Eliminar una tarea
    public function destroy(Tasks $task)
    {
        // Obtener la task
        $task = Task::findOrFail($id);

        // Verificar que la task pertenezca al usuario autenticado
        if ($task->user_id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para eliminar esta task'], 403);
        }

        // Eliminar la task y sus objetivos
        $task->objectives()->delete(); // Elimina los objetivos asociados
        $task->delete(); // Elimina la task

        return response()->json(['message' => 'Task and its objectives deleted successfully'], 200);
    }
}
