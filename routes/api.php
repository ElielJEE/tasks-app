<?php
// routes/api.php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);

Route::group(['middleware' => ['auth:api']], function() {
   Route::post('/logout', [LoginController::class, 'logout']);
   Route::get('/user', [UserController::class, 'getUser']);
});


   // Más rutas...