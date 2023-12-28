<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'assigned_to',
        'project_id',
        'title',
        'content',
        'visible',
        'status',
        'created_by',
        'sort_by',
    ];

    /**
     * Add links to other tables.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
