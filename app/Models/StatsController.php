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

    public function updateStatistics($type, $amount = null)
    {
        $statistics = StatsController::firstOrCreate(['user_id' => $this->id]);

        switch ($type) {
            case 'tasks_created':
                $statistics->increment('tasks_created');
                break;
            case 'tasks_completed':
                $statistics->increment('tasks_completed');
                break;
            case 'tasks_failed':
                $statistics->increment('tasks_failed');
                break;
            case 'quests_created':
                $statistics->increment('quests_created');
                break;
            case 'quests_completed':
                $statistics->increment('quests_completed');
                break;
            case 'quests_failed':
                $statistics->increment('quests_failed');
                break;
            case 'habits_created':
                $statistics->increment('habits_created');
                break;
            case 'total_experience':
                $statistics->increment('total_experience', $amount);
                break;
            case 'current_level':
                $statistics->update(['current_level' => $this->level]);
                break;
            default:
                throw new \InvalidArgumentException('Invalid statistic type');
        }

        $statistics->save();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
