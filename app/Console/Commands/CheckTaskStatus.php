<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

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
        $tasks = Tasks::all();

        foreach ($tasks as $task) {
            // Reactivar la tarea si fue completada y han pasado 24 horas
            if ($task->needsReactivation()) {
                $task->update(['completed' => false, 'last_completed_at' => Carbon::now()]);
                Log::info("Tarea reactivada para el usuario: {$task->user_id}, Tarea: {$task->title}");
            }
        }
        return Command::SUCCESS;
    }
}
