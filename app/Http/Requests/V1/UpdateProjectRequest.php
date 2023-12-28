<?php

namespace App\Http\Requests\V1;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
                'title' => ['sometimes', 'required'],
                'description' => ['sometimes', 'required'],
                'visible' => ['sometimes', 'required', Rule::in([0, 1])],
                'status' => ['sometimes', 'required', Rule::in(['new', 'in-progress', "on-hold", "done"])]
            ];
        } else {
            return [
                'assignedTo' => ['required'],
                'title' => ['required'],
                'description' => ['required'],
                'visible' => ['required', Rule::in([0, 1])],
                'status' => ['required', Rule::in(['new', 'in-progress', "on-hold", "done"])]
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
    }
}
