<?php

namespace App\Http\Controllers;

use App\Models\Quests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class QuestsController extends Controller
{
     // Mostrar todas las quests del usuario autenticado
     public function index()
     {
         $quests = Quest::where('user_id', Auth::id())->get();
         return response()->json($quests);
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
         $quest = Quest::create([
             'user_id' => Auth::id(),
             'name' => $request->name,
             'description' => $request->description,
             'status' => $request->status ?? 'active',
         ]);
 
         return response()->json($quest, 201);
     }
 
     // Actualizar una quest existente
     public function update(Request $request, Quest $quest)
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
     public function destroy(Quest $quest)
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
