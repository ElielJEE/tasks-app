<?php
// routes/api.php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api'])->group(function(){
   Route::post('logout', [AuthController::class, 'Logout']);
   Route::post('refresh', [AuthController::class, 'refresh']);
   Route::post('user', [AuthController::class, 'user']);
   Route::put('update', [UserController::class, 'update']);
});

Route::group(['prefix' => 'auth'], function ($router) {
   Route::post('login', [AuthController::class, 'login']);
   Route::post('register', [AuthController::class, 'register']);
});

Route::middleware('auth:sanctum')->group(function () {
   // Rutas para tareas (tasks)
   Route::get('tasks', [TaskController::class, 'index']);
   Route::post('createtask', [TaskController::class, 'store']);
   Route::put('updatetask', [TaskController::class, 'update']);
   Route::delete('deletetask', [TaskController::class, 'destroy']);

   // Rutas para quests
   Route::get('quests', [QuestController::class, 'index']);
   Route::post('createquest', [QuestController::class, 'store']);
   Route::put('updatequest', [QuestController::class, 'update']);
   Route::delete('deletequest', [QuestController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
   // Rutas para los objetivos de las tareas
   Route::get('taskobjectives', [ObjectiveController::class, 'indexForTask']);
   Route::post('createtaskobjectives', [ObjectiveController::class, 'storeForTask']);

   // Rutas para los objetivos de las quests
   Route::get('questobjectives', [ObjectiveController::class, 'indexForQuest']);
   Route::post('createquestobjectives', [ObjectiveController::class, 'storeForQuest']);

   // Actualizar y eliminar objetivos
   Route::put('editobjectives', [ObjectiveController::class, 'update']);
   Route::delete('deleteobjectives', [ObjectiveController::class, 'destroy']);
});