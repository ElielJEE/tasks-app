<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'title', 'description', 'difficulty', 'estimated_time', 'status', 'completed'];

    //Esto es para la foreignKey
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function objectives()
    {
        return $this->morphMany(Objectives::class, 'related');
    }
}
