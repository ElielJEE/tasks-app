<?php

namespace App\Models;

use Illuminate\Console\View\Components\Task;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'displayname',
        'avatar',
        'level',
        'xp',
        'maxhp',
        'hp',
        'maxhp',
        'coins',//Tambien si no te gusta la idea borrala de aqui
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the identifier that will be stored in the JWT token.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey(); // Devuelve el ID del usuario o cualquier identificador único
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return []; // Si no tienes claims personalizados, puedes devolver un array vacío
    }

    public function tasks()
    {
        return $this->hasMany(Tasks::class);
    }
    
    public function quests()
    {
        return $this->hasMany(Quests::class);
    }

    public function habits()
    {
        return $this->hasMany(Habits::class);
    }
}
