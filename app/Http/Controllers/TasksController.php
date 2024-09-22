<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    // Mostrar todas las tareas del usuario creadas
    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())->get();
        return response()->json($tasks);
    }

    // Crear una nueva tarea
    public function store(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'difficulty' => 'required|in:easy,medium,hard',
            'estimated_time' => 'required|integer',
            'status' => 'nullable|in:pending,completed'
        ]);

        // Crear la tarea asociada al usuario autenticado
        $task = Task::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'difficulty' => $request->difficulty,
            'estimated_time' => $request->estimated_time,
            'status' => $request->status ?? 'pending'
        ]);

        return response()->json($task, 201);
    }

    // Actualizar una tarea existente
    public function update(Request $request, Task $task)
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
    public function destroy(Task $task)
    {
        // Verificar que la tarea pertenece al usuario autenticado
        if ($task->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Eliminar la tarea
        $task->delete();

        return response()->json(null, 204);
    }
}
