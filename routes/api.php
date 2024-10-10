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
   Route::get('/tasks/{user_id}', [TaskController::class, 'show'])->name('tasks.show');
   Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
   Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
   Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.delete');

   // Rutas para quests
   Route::get('/quests/{user_id}', [QuestController::class, 'show'])->name('quests.show');
   Route::post('/quests', [QuestController::class, 'store'])->name('quests.store');
   Route::put('/quests/{quest}', [QuestController::class, 'update'])->name('quests.update');
   Route::delete('/quests/{quest}', [QuestController::class, 'destroy'])->name('quests.delete');
});

Route::middleware('auth:api')->group(function () {
    // CRUD para los objetivos de quests
    Route::get('/quests/{quest_id}/objectives', [ObjectiveController::class, 'showObjectivesByQuest'])->name('questsobj.show');
    Route::post('/quests/{quest_id}/objectives', [ObjectiveController::class, 'storeObjectiveForQuest'])->name('questsobj.store');
    Route::put('/quests/{quest_id}/objectives/{objective_id}', [ObjectiveController::class, 'updateObjectiveForQuest'])->name('questsobj.update');
    Route::delete('/quests/{quest_id}/objectives/{objective_id}', [ObjectiveController::class, 'deleteObjectiveForQuest'])->name('questsobj.delete');
    
    // CRUD para los objetivos de tasks
    Route::get('/tasks/{task_id}/objectives', [ObjectiveController::class, 'showObjectivesByTask'])->name('tasksobj.show');
    Route::post('/tasks/{task_id}/objectives', [ObjectiveController::class, 'storeObjectiveForTask'])->name('tasksobj.store');
    Route::put('/tasks/{task_id}/objectives/{objective_id}', [ObjectiveController::class, 'updateObjectiveForTask'])->name('tasksobj.update');
    Route::delete('/tasks/{task_id}/objectives/{objective_id}', [ObjectiveController::class, 'deleteObjectiveForTask'])->name('tasksobj.delete');
});