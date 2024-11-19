<?php

namespace App\Http\Controllers;

use App\Models\StatsController;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class StatsControllerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$userId = Auth::id();
        $statistics = StatsController::where('user_id', $userId)->firstOrFail();

        return response()->json([
            'statistics' => $statistics,
        ]);
    }
    
    public function incrementStat($type)
    {
        $userId = Auth::id();
        $statistics = StatsController::firstOrCreate(['user_id' => $userId]);

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
                $statistics->increment('total_experience', request('exp'));
                break;
            case 'current_level':
                $statistics->update(['current_level' => request('level')]);
                break;
            default:
                return response()->json(['error' => 'Invalid statistic type'], 400);
        }

        return response()->json(['message' => 'Statistic updated successfully', 'statistics' => $statistics]);
    }
}
