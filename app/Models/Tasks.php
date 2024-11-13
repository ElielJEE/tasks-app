<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'title', 'description', 'difficulty', 'estimated_time', 'status', 'completed', 'last_completed_at'];

    //Esto es para la foreignKey
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function objectives()
    {
        return $this->morphMany(Objectives::class, 'related');
    }

    public function needsReactivation()
    {
        if ($this->completed && $this->last_completed_at) {
            $nextActivationTime = Carbon::parse($this->last_completed_at)->addHours(24);
            return now()->greaterThanOrEqualTo($nextActivationTime);
        }
        return false;
    }
}
