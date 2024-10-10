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

Route::middleware(['auth:api'])->group(function () {
   // Rutas para tareas (tasks)
   Route::post('/tasks/{user_id}', [TasksController::class, 'show'])->name('tasks.show');
   Route::post('/tasks', [TasksController::class, 'store'])->name('tasks.store');
   Route::put('/tasks/{task}', [TasksController::class, 'update'])->name('tasks.update');
   Route::delete('/tasks/{task}', [TasksController::class, 'destroy'])->name('tasks.delete');

   // Rutas para quests
   Route::post('/quests/{user_id}', [QuestsController::class, 'show'])->name('quests.show');
   Route::post('/quests', [QuestsController::class, 'store'])->name('quests.store');
   Route::put('/quests/{quest}', [QuestsController::class, 'update'])->name('quests.update');
   Route::delete('/quests/{quest}', [QuestsController::class, 'destroy'])->name('quests.delete');
});

// Rutas para tareas
// Route::prefix('tasks/{task}')->group(function () {
//    Route::get('objectives', [ObjectiveController::class, 'index']); // Obtener los objetivos de una task
// });

// // Rutas para quests
// Route::prefix('quests/{quest}')->group(function () {
//    Route::get('objectives', [ObjectiveController::class, 'index']); // Obtener los objetivos de una quest
// });

// // Rutas generales para actualizar y eliminar objetivos
// Route::put('objectives/{id}', [ObjectiveController::class, 'update']);
// Route::delete('objectives/{id}', [ObjectiveController::class, 'destroy']);