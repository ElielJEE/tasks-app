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
        Schema::create('objectives', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('quest_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('description');  // Campo para la descripción del objetivo
            $table->boolean('completed')->default(false);  // Campo para el estado de completado
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('objectives');
    }
};
