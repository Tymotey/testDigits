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
        $creatorOnly = $request->query('creatorOnly');
        $forSelect = $request->query('forSelect');

        if ($creatorOnly === 'true') {
            $data = [
                'createdBy' => $this->created_by,
            ];
        } else if ($forSelect === 'true') {
            $data = [
                'value' => $this->id,
                'label' => $this->title,
            ];
        } else {
            $data = [
                'id' => $this->id,
                'assignedTo' => $this->assigned_to,
                'assignedToData' => User::where('id', $this->assigned_to)->first(),
                'title' => $this->title,
                'description' => $this->description,
                'visible' => $this->visible,
                'status' => $this->status,
                'createdBy' => $this->created_by,
                'createdByData' => User::where('id', $this->created_by)->first(),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];

            $includeTasks = $request->query('includeTasks');
            if ($includeTasks === 'true') {
                $data['tasks'] = TaskResource::collection(Task::where('project_id', $this->id)->orderBy('sort_by', 'asc')->get());
            }
        }
        return $data;
    }
}
