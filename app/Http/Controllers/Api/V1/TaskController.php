<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Task;
use App\Http\Requests\V1\StoreTaskRequest;
use App\Http\Requests\V1\UpdateTaskRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TaskResource;
use App\Http\Resources\V1\TaskCollection;
use Illuminate\Http\Request;
use App\Filters\V1\TaskFilter;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new TaskFilter();
        $filterItems = $filter->transform($request); // [['column', 'operator', 'value']]

        $tasks = Task::where($filterItems);

        // Add per page limit
        $perPage = $request->input('results', 999);
        if (!is_numeric($perPage)) {
            $perPage = 999;
        }

        // Get task by project
        $project_id = $request->input('projectId', null);
        if ($project_id !== null) {
            $tasks->where('project_id', $project_id);
        }

        // If user type
        if ($request->user()->hasRole('user')) {
            $tasks->where('assigned_to', $request->user()->id);
            $tasks->where('visible', '1');
        }

        // Order by column order
        $tasks->orderBy('sort_by', 'asc');

        return new TaskCollection($tasks->paginate($perPage)->appends($request->query()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        // return $task;
        return new TaskResource($task);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id;

        return new TaskResource(Task::create($data));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        // if ($request->user()->hasRole('admin') || ) {
        $task->update($request->all());
        // }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
    }
}
