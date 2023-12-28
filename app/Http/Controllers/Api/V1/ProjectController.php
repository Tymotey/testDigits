<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Project;
use App\Http\Requests\V1\StoreProjectRequest;
use App\Http\Requests\V1\UpdateProjectRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProjectResource;
use App\Http\Resources\V1\ProjectCollection;
use Illuminate\Http\Request;
use App\Filters\V1\ProjectFilter;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user_id = $request->user()->id;

        $filter = new ProjectFilter();
        $filterItems = $filter->transform($request); // [['column', 'operator', 'value']]

        $projects = Project::where($filterItems);

        // Add tasks to project list
        $includeTasks = $request->query('includeTasks');
        if ($includeTasks === 'true') {
            $projects = $projects->with('tasks');
        }

        // Add per page limit
        $perPage = $request->input('results', 15);
        if (!is_numeric($perPage)) {
            $perPage = 15;
        }

        // If user type
        if ($request->user()->hasRole('user')) {
            $projects->where(function ($query) use ($user_id) {
                $query->where('assigned_to', '=', $user_id)
                    ->orWhere('created_by', '=', $user_id);
            });
            $projects->where('visible', '1'); // TODO: daca nu e a lui!!!!
        }

        $projects->orderBy('title', 'asc');

        return new ProjectCollection($projects->paginate($perPage)->appends($request->query()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $request = request();
        if ($request->user()->hasRole('admin') || ($request->user()->hasRole('user') && ($project->created_by === $request->user()->id || $project->assigned_to === $request->user()->id))) {
            return (new ProjectResource($project->loadMissing(['tasks'])));
        } else {
            return response()->json([
                'success' => false,
                'message' => 'You do not have access to this resource',
            ], 401);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->all();
        $data['created_by'] = $request->user()->id;

        return new ProjectResource(Project::create($data));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        if ($request->user()->hasRole('admin') || ($request->user()->hasRole('user') && $project->created_by === $request->user()->id)) {
            $project->update($request->all());
        } else {
            return response()->json([
                'success' => false,
                'message' => 'You do not have access to this resource',
            ], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $request = request();
        if ($request->user()->hasRole('admin') || ($request->user()->hasRole('user') && $project->created_by === $request->user()->id)) {
            $project->delete();
        } else {
            return response()->json([
                'success' => false,
                'message' => 'You do not have access to this resource',
            ], 401);
        }
    }
}
