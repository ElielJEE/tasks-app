<?php
// routes/api.php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ObjectivesController;
use App\Http\Controllers\QuestsController;
use App\Http\Controllers\TasksController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api'])->group(function(){
   Route::post('logout', [AuthController::class, 'Logout']);
   Route::post('refresh', [AuthController::class, 'refresh']);
   Route::post('user', [AuthController::class, 'user']);
   /* Route::put('update', [UserController::class, 'update']); */
});

Route::group(['prefix' => 'auth'], function ($router) {
   Route::post('login', [AuthController::class, 'login']);
   Route::post('register', [AuthController::class, 'register']);
});

Route::middleware(['auth:sanctum'])->group(function () {
   // Rutas para tareas (tasks)
   Route::get('indextasks', [TasksController::class, 'index']);
   Route::post('createtask', [TasksController::class, 'store']);
   Route::put('updatetask', [TasksController::class, 'update']);
   Route::delete('deletetask', [TasksController::class, 'destroy']);

   // Rutas para quests
   Route::get('quests', [QuestsController::class, 'index']);
   Route::post('createquest', [QuestsController::class, 'store']);
   Route::put('updatequest', [QuestsController::class, 'update']);
   Route::delete('deletequest', [QuestsController::class, 'destroy']);
});

Route::middleware('auth:api')->group(function () {
   // Rutas para los objetivos de las tareas
   Route::get('taskobjectives', [ObjectivesController::class, 'indexForTask']);
   Route::post('createtaskobjectives', [ObjectivesController::class, 'storeForTask']);

   // Rutas para los objetivos de las quests
   Route::get('questobjectives', [ObjectivesController::class, 'indexForQuest']);
   Route::post('createquestobjectives', [ObjectivesController::class, 'storeForQuest']);

   // Actualizar y eliminar objetivos
   Route::put('editobjectives', [ObjectivesController::class, 'update']);
   Route::delete('deleteobjectives', [ObjectivesController::class, 'destroy']);
});