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
        //Por el momento no agregare los objetivos de la Quest
        Schema::create('quests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('difficulty', ['facil', 'medio', 'dificil']);
            $table->enum('status', ['activo', 'completo'])->default('activo');
            $table->date('start_date'); // Fecha de inicio definida por el usuario
            $table->date('end_date');   // Fecha de finalización definida por el usuario
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quests');
    }
};
