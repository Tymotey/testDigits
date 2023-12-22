<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class ProjectFilter extends ApiFilter
{
    protected $safeParams = [
        'user_id' => ['eq'],
        'title' => ['eq'],
        'description' => ['eq'],
        'visible' => ['eq'],
        'status' => ['eq'],
    ];

    protected $columnMap = [
        'userId' => 'user_id',
        'title' => 'title',
        'description' => 'description',
        'visible' => 'visible',
        'status' => 'status',
        'createdAt' => 'created_at',
        'updatedAt' => 'updated_at',
    ];

    public function transform(Request $request)
    {
        $eloQuery = [];

        foreach ($this->safeParams as $param => $operators) {
            $query = $request->query($param);

            if (!isset($query)) {
                continue;
            }

            $column = $this->columnMap[$param] ?? $param;

            foreach ($operators as $operator) {
                if (isset($query[$operator])) {
                    $eloQuery[] = [$column, $this->operatorMap[$operator], $query[$operator]];
                }
            }
        }

        return $eloQuery;
    }
}
