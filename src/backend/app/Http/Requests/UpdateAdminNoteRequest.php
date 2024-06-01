<?php

namespace App\Http\Requests;

use App\Rules\NoteIsPublic;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;

class UpdateAdminNoteRequest extends FormRequest
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
            'id' => ['required', 'integer', new NoteIsPublic()],
            'is_public' => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => Lang::get('validation.note.id.required'),
            'id.integer' => Lang::get('validation.note.id.integer'),
            'is_public.required' => Lang::get('validation.note.is_public.required'),
            'is_public.boolean' => Lang::get('validation.note.is_public.boolean'),
        ];
    }
}
