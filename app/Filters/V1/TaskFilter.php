<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class TaskFilter extends ApiFilter
{
    protected $safeParams = [
        'assigned_to' => ['eq'],
        'project_id' => ['eq'],
        'title' => ['eq', 'like'],
        'content' => ['eq', 'like'],
        'visible' => ['eq'],
        'status' => ['eq'],
    ];

    protected $columnMap = [
        'assignedTo' => 'assigned_to',
        'projectId' => 'project_id',
        'createdAt' => 'created_at',
        'updatedAt' => 'updated_at',
    ];

}
