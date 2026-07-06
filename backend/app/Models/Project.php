<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'status',
        'description',
        'images',
        'github_link',
        'demo_link',
    ];

    protected $casts = [
    'images' => 'array',
    ];
}
