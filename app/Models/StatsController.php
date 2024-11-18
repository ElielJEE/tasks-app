<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatsController extends Model
{

    use HasFactory;

    protected $fillable = [
        'user_id',
        'tasks_created',
        'tasks_failed',
        'quests_created',
        'quests_failed',
        'habits_created',
        'current_level',
        'total_experience',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
