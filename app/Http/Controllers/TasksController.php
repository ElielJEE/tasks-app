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
        $tasks = Tasks::where('user_id', $id)->all();
        
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
        // Validar los datos de entrada
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'difficulty' => 'required|in:easy,medium,hard',
            'estimated_time' => 'nullable|integer',
            'status' => 'nullable|in:pending,completed'
        ]);

        $user = auth('api')->user();

        // Crear la tarea asociada al usuario autenticado
        $task = Tasks::create([
            'user_id' => $user->id,
            'title' => $request->title,
            'description' => $request->description,
            'difficulty' => $request->difficulty,
            'estimated_time' => $request->estimated_time ?? '24',
            'status' => $request->status ?? 'pending'
        ]);

        // // Validación de la task
        // $validatedData = $request->validate([
        //     'title' => 'required|string|max:255',
        //     'description' => 'nullable|string',
        //     'objectives' => 'array|required', // Validar que los objetivos están presentes
        //     'objectives.*.name' => 'required|string|max:255', // Cada objetivo debe tener un nombre
        // ]);

        // // Crear la Task
        // $task = Task::create([
        //     'user_id' => Auth::id(),
        //     'title' => $validatedData['title'],
        //     'description' => $validatedData['description'],
        // ]);

        // // Crear los Objetivos asociados a la Task
        // foreach ($validatedData['objectives'] as $objectiveData) {
        //     Objective::create([
        //         'task_id' => $task->id,
        //         'name' => $objectiveData['name'],
        //     ]);
        // }

        return response()->json($task, 201);
    }

    // Actualizar una tarea existente
    public function update(Request $request, Tasks $task)
    {
        // Verificar que la tarea pertenece al usuario autenticado
        if ($task->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Validar los datos de entrada
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'difficulty' => 'required|in:easy,medium,hard',
            'estimated_time' => 'required|integer',
            'status' => 'nullable|in:pending,completed'
        ]);

        // Actualizar la tarea
        $task->update($request->all());

        return response()->json($task);
    }

    // Eliminar una tarea
    public function destroy(Tasks $task)
    {
        if ($task->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Eliminar la tarea
        $task->delete();

        return response()->json(null, 204);
    }
}
