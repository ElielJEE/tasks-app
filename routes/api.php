<?php
   // routes/api.php

   use App\Http\Controllers\UserController;
   use Illuminate\Support\Facades\Route;

   Route::get('/users', [LoginController::class, 'login']);
   Route::post('/users', [RegisterController::class, 'register']);
   // Más rutas...