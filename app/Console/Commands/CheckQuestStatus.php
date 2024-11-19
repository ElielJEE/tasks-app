<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Quests;
use App\Models\User;
use App\Models\StatsController;

class CheckQuestStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-quest-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $quests = Quests::where('status', 'Activo')
        ->where('end_date', '<', Carbon::now())
        ->get();

        foreach ($quests as $quest) {
            
            // Reducir vida del usuario
            $user = $quest->user;
            $damage = 15; // Ejemplo: 15% de daño al fallar
            $user->$setCurrentLife($damage);

            $statistics = UserStatistic::firstOrCreate(['user_id' => Auth::id()]);
            $statistics->increment('quests_failed');

            // Eliminar la quest
            $quest->delete();
        }
    }
}
