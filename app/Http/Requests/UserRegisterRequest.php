<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if ($this->isMethod('post')) {
            // Reglas para crear un nuevo usuario
            return [
                'name' => 'required|string|unique:users|max:255',
                'displayname' => 'nullable|string|max:255',
                'email' => 'required|string|email|unique:users|max:255',
                'password' => 'required|string|min:6',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:100048',
            ];
        } else {
            // Reglas para actualizar un usuario
            return [
                'name' => 'nullable|string|max:255',
                'displayname' => 'nullable|string|max:255',
                'email' => 'nullable|string|email|unique:users,email,' . $this->user()->id . '|max:255',
                'password' => 'nullable|string|min:6',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:100048',
            ];
        }
    }
}
