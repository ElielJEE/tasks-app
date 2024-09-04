<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // validar los datos del request
        $validator = $this->validator($request->all());

        // si hay un fallo en los datos, devolver un error
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422); // error de datos no procesables
        }

        // Crear el nuevo usuario
        $user = $this->create($request->all());

        // Autenticar al usuario recien registrado
        Auth::login($user);

        // Devolver respuesta de creacion exitosa
        return response()->json([
            'message' => 'Registration successful',
            'user' => $user
        ], 201); // Usuario creado
    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);
    }

    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
