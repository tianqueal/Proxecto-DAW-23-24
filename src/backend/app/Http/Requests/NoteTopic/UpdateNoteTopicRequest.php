<?php

namespace App\Http\Requests\NoteTopic;

use App\Http\Requests\BaseNoteTopicRequest;
use Illuminate\Foundation\Http\FormRequest;

class UpdateNoteTopicRequest extends FormRequest
{
    use BaseNoteTopicRequest;
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
        return $this->commonOptionalNoteTopicRules();
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return $this->commonMessages();
    }
}
