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

    // Definir la relación polimórfica
    public function objectiveable()
    {
        return $this->morphTo();
    }
}
