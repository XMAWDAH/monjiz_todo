<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'details', 'is_completed', 'user_id','date'];

    protected $casts = [
        'is_completed' => 'boolean',
    ];
}

