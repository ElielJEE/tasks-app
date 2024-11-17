<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('difficulty', ['facil', 'medio', 'dificil']);
            $table->integer('estimated_time')->default(24); // esto es en minutos
            $table->enum('status', ['pendiente', 'completado'])->default('pendiente'); //Aqui por defecto iran los estatus de pendiente o completado, pero de base sera pendiente
            $table->boolean('completed')->default(false); // Estado de la tarea (completada o no)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
