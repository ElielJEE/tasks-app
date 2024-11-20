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
        $userId = Auth::id();
        $statistics = StatsController::where('user_id', $userId)->firstOrFail();

        return response()->json([
            'statistics' => $statistics,
        ]);
    }
}
