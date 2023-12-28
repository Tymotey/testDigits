<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);
        $forSelect = $request->query('forSelect');

        $fields = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'emailVerifiedAt' => $this->email_verified_at,
            'rememberToken' => $this->remember_token,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
        if ($forSelect === 'true') {
            $fields = [
                'value' => $this->id,
                'label' => $this->name . '(' . $this->email . ')',
            ];
        }



        return $fields;
    }
}
