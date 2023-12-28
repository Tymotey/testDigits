<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class ProjectFilter extends ApiFilter
{
    protected $safeParams = [
        'assigned_to' => ['eq'],
        'title' => ['eq', 'like'],
        'description' => ['eq', 'like'],
        'visible' => ['eq'],
        'status' => ['eq'],
    ];

    protected $columnMap = [
        'assignedTo' => 'assigned_to',
        'title' => 'title',
        'description' => 'description',
        'visible' => 'visible',
        'status' => 'status',
        'createdAt' => 'created_at',
        'updatedAt' => 'updated_at',
    ];

}
