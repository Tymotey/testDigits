<?php

namespace App\Http\Resources\V1;

use App\Models\User;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);
        // var_dump(Task::where('project_id', $this->id)->orderBy('sort_by', 'asc'));
        $data = [
            'id' => $this->id,
            'assignedTo' => $this->assigned_to,
            'assignedToData' => User::where('id', $this->assigned_to)->first(),
            'title' => $this->title,
            'description' => $this->description,
            'visible' => $this->visible,
            'status' => $this->status,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            //'tasks' => TaskResource::collection($this->whenLoaded('tasks')),
        ];

        $includeTasks = $request->query('includeTasks');
        if ($includeTasks === 'true') {
            $data['tasks'] = Task::where('project_id', $this->id)->orderBy('sort_by', 'asc')->get();
        }

        return $data;
    }
}
