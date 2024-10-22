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
        'related_type',
        'related_id'
    ];

    // Relación con Task
    public function related()
    {
        return $this->morphTo();
    }
}
