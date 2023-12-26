<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProjectResource;
use App\Http\Resources\V1\ProjectCollection;
use Illuminate\Http\Request;
use App\Filters\V1\ProjectFilter;
use Illuminate\Support\Facades\Gate;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $request->user()->id
        // var_dump((bool) $request->user()->isAdmin());
        $filter = new ProjectFilter();
        $filterItems = $filter->transform($request); // [['column', 'operator', 'value']]

        $projects = Project::where($filterItems);

        // Add tasks to project list
        $includeTasks = $request->query('includeTasks');
        if ($includeTasks === 'true') {
            $projects = $projects->with('tasks');
        }

        $projects->with('user');

        // Add per page limit
        $perPage = $request->input('results', 15);
        if (!is_numeric($perPage)) {
            $perPage = 15;
        }

        // If user type
        if ($request->user()->hasRole('user')) {
            $projects->where('assigned_to', $request->user()->id);
            $projects->where('visible', '1');
        }

        return new ProjectCollection($projects->paginate($perPage)->appends($request->query()));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // return $project;
        return new ProjectResource($project);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
