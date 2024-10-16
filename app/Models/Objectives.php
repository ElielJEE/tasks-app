<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Objectives extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'completed',
        'objectiveable_id',
        'objectiveable_type',
    ];

    // Relación con Task
    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    // Relación con Quest
    public function quest()
    {
        return $this->belongsTo(Quest::class);
    }
}
