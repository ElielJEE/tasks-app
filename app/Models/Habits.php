<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habits extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'count',
    ];

    /**
     * Relación con el usuario que tiene este hábito.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
