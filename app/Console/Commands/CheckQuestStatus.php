<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Quests;
use App\Models\User;

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
            // Marcar como fallida
            $quest->update([
                'status' => 'fallido',
            ]);
            
            // Reducir vida del usuario
            $user = $task->user;
            $damage = 15; // Ejemplo: 15% de daño al fallar
            $user->$setCurrentLife($damage);

            // Eliminar la quest
            $quest->delete();
        }
    }
}
