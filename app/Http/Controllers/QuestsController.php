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
        // Verificamos si el usuario autenticado está accediendo a sus propias quests
        if ($id != Auth::id()) {
            return response()->json(['error' => 'No autorizado para ver estas quests'], 403);
        }

        // Obtener todas las quests asociadas a este usuario
        $quests = Quest::where('user_id', $id)->get();

        if ($quests->isEmpty()) {
            return response()->json(['message' => 'No quests found'], 200);
        }

        return response()->json($quests, 200);
    }

    // Crear una nueva quest
    public function store(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:active,completed'
        ]);

        // Crear la quest asociada al usuario autenticado
        $quest = Quests::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status ?? 'active',
        ]);

        return response()->json($quest, 201);
    }

    // Actualizar una quest existente
    public function update(Request $request, Quests $quest)
    {
        // Verificar que la quest pertenece al usuario autenticado
        if ($quest->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Validar los datos de entrada
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|in:active,completed'
        ]);

        // Actualizar la quest
        $quest->update($request->all());

        return response()->json($quest);
    }

    // Eliminar una quest
    public function destroy(Quests $quest)
    {
        // Verificar que la quest pertenece al usuario autenticado
        if ($quest->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Eliminar la quest
        $quest->delete();

        return response()->json(null, 204);
    }
}
