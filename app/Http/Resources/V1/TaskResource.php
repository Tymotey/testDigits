<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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

        if ($creatorOnly === 'true') {
            $data = [
                'createdBy' => $this->created_by,
            ];

            return $data;
        } else {
            $data = [
                'id' => $this->id,
                'projectId' => $this->project_id,
                'assignedTo' => $this->assigned_to,
                'title' => $this->title,
                'content' => $this->content,
                'status' => $this->status,
                'visible' => $this->visible,
                'sortBy' => $this->sort_by,
                'createdBy' => $this->created_by,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];

            return $data;
        }
    }
}
