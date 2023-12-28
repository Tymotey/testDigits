<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
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
        $method = $this->method();

        if ($method === 'PUT') {
            return [
                'assignedTo' => ['sometimes', 'required'],
                'projectId' => ['sometimes', 'required'],
                'title' => ['sometimes', 'required'],
                'content' => ['sometimes', 'required'],
                'visible' => ['sometimes', 'required', Rule::in([0, 1])],
                'status' => ['sometimes', 'required', Rule::in(['done', 'not-done'])],
                'sortBy' => ['sometimes', 'required'],
            ];
        } else {
            return [
                'assignedTo' => ['required'],
                'title' => ['required'],
                'content' => ['required'],
                'visible' => ['required', Rule::in([0, 1])],
                'status' => ['required', Rule::in(['done', 'not-done'])]
            ];
        }
    }

    protected function prepareForValidation()
    {
        if ($this->assignedTo) {
            $this->merge([
                'assigned_to' => $this->assignedTo,
            ]);
        }
        if ($this->projectId) {
            $this->merge([
                'project_id' => $this->projectId,
            ]);
        }
        if ($this->sortBy) {
            $this->merge([
                'sort_by' => $this->sortBy,
            ]);
        }
    }
}
