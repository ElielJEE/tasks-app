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
        Schema::create('stats_controllers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('tasks_created')->default(0);
            $table->integer('tasks_failed')->default(0);
            $table->integer('quests_created')->default(0);
            $table->integer('quests_failed')->default(0);
            $table->integer('habits_created')->default(0);
            $table->integer('current_level')->default(1);
            $table->integer('total_experience')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stats_controllers');
    }
};
