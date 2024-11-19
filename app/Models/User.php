<?php

namespace App\Models;

use Illuminate\Console\View\Components\Task;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\StatsController;

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
        'xppercent',
        'maxhp',
        'hp',
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

    public function addExperience($amount)
    {
        $statistics = StatsController::firstOrCreate(['user_id' => $this->id]);
        // Validar que la cantidad sea positiva
        if ($amount <= 0) {
            return;
        }

        // Incrementar la experiencia
        $this->xp += (int) $amount;

        // Calcular el EXP necesario para el próximo nivel
        $expForNextLevel = (int) floor(50 * pow(1.25, $this->level));

        // Subir de nivel si el EXP excede el necesario
        while ($this->xp >= $expForNextLevel) {
            $this->xp -= $expForNextLevel;
            $this->level++;
            $this->hp = $this->maxhp;
            $expForNextLevel = (int) floor(50 * pow(1.25, $this->level));
            $statistics->increment('current_level');
        }
        
        // Actualizar estadísticas
        // $this->updateStatistics((int)$amount);
        $expPercentage = ($this->xp / (int) floor(50 * pow(1.25, $this->level))) * 100;

        $this->xppercent = $expPercentage;
        
        $this->save();
    }

    // Método para calcular el EXP necesario
    private function calculateExpForNextLevel()
    {
        // return (int) floor(50 * pow(1.25, $this->level));
    }

    // Método para actualizar estadísticas
    private function updateStatistics($amount)
    {
        $statistics = StatsController::firstOrCreate(['user_id' => this->id]);

        // Incrementar experiencia total ganada
        $statistics->updateStatistics('total_experience', $amount);

        // Actualizar el nivel actual
        $statistics->updateStatistics('current_level', $amount);
    }

    public function ReturnExp()
    {
        // Retornar la respuesta en porcentaje
        $expPercentage = ($this->xp / $this->calculateExpForNextLevel()) * 100;

        return response()->json(['Experience' => floor($expPercentage)], 200);
    }

    public function setCurrentLife($damage)
    {
        $statistics = StatsController::firstOrCreate(['user_id' => $this->id]);
        $this->hp -= (int) $damage;
        $user = auth('api')->user();

        if ($user->hp <= 0) {
            $user->hp = $user->maxhp;
            if ($user->level > 1) {
                $user->level--;
                $statistics->decrement('current_level');
            }
        }

        $user->save();
    }

    

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
