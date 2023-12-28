<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class UserFilter extends ApiFilter
{
    protected $safeParams = [
        'name' => ['eq', 'like'],
        'email' => ['eq', 'like'],
    ];

    protected $columnMap = [
        'name' => 'name',
        'email' => 'email',
    ];

}
