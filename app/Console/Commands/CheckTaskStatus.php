<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Tasks;
use App\Models\User;
use App\Models\StatsController;

class CheckTaskStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-task-status';

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
        $tasks = Tasks::where('status', 'pendiente')->get();

        foreach ($tasks as $task) {
            // Obtener la fecha y hora actual en la zona horaria de Nicaragua
            $now = now()->setTimezone('America/Managua');
    
            // Calcular el tiempo límite para la tarea (2:00 AM del día siguiente al de creación)
            $taskDeadline = $now->copy()->startOfDay()->addHours(2);
    
            // Si la fecha actual es igual o mayor al límite y la tarea sigue pendiente
            if ($now->greaterThanOrEqualTo($taskDeadline)) {
                // Marcar como fallida
                $task->update(['status' => 'fallida']);
    
                // Reducir vida del usuario
                $user = $task->user;
                $damage = 15; // Ejemplo: 15% de daño al fallar
                $user->$setCurrentLife($damage);

                $statistics = StatsController::firstOrCreate(['user_id' => Auth::id()]);
                $statistics->increment('tasks_failed');
    
                // Reactivar la tarea tras 10 minutos
                $reactivateTime = $now->copy()->addMinutes(10);
                dispatch(function () use ($task) {
                    $task->update(['status' => 'pendiente']);
                })->delay($reactivateTime);
            }
        }
        return Command::SUCCESS;
    }
}
