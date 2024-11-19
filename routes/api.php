<?php
// routes/api.php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HabitsController;
use App\Http\Controllers\ObjectivesController;
use App\Http\Controllers\QuestsController;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserStatisticController;

Route::middleware(['auth:api'])->group(function(){
   Route::post('logout', [AuthController::class, 'Logout']);
   Route::post('refresh', [AuthController::class, 'refresh']);
   Route::post('user', [AuthController::class, 'user']);
   Route::put('update', [UsersController::class, 'update']);
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

Route::middleware(['auth:api'])->group(function () {
   Route::post('habits/{id}', [HabitsController::class, 'show'])->name('habits.show');
   Route::post('habits', [HabitsController::class, 'store'])->name('habits.store');
   Route::put('habits/{id}', [HabitsController::class, 'update'])->name('habits.update');
   Route::delete('habits/{id}', [HabitsController::class, 'destroy'])->name('habits.destroy');

   // Rutas para incrementar y decrementar el contador
   Route::post('habits/{id}/increment', [HabitsController::class, 'incrementCount'])->name('habits.increment');
   Route::post('habits/{id}/decrement', [HabitsController::class, 'decrementCount'])->name('habits.decrement');
});

Route::middleware(['auth:api'])->group(function () {
   Route::post('/user/statistics', [UserStatisticController::class, 'index']);
});