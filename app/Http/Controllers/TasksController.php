<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    // Mostrar todas las tareas del usuario creadas
    public function index()
    {
        // Obtener el usuario autenticado directamente desde el token JWT
        $user = auth('api')->user();

        // Verificar si se obtuvo correctamente el usuario
        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        // Consultar las tareas asociadas al usuario autenticado
        $tasks = Tasks::where('user_id', $user->id)->get();

        // Devolver las tareas en formato JSON
        return response()->json($tasks, 200);
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
