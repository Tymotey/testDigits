<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'assignedTo' => ['required'],
            'title' => ['required'],
            'description' => ['required'],
            'visible' => ['required', Rule::in([0, 1])],
            'status' => ['required', Rule::in(['new', 'in-progress', "on-hold", "done"])]
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'assigned_to' => $this->assignedTo,
            'created_by' => $this->createdBy,
        ]);
    }
}
