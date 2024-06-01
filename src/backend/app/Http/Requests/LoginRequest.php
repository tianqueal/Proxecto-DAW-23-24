<?php

namespace App\Http\Requests;

use App\Rules\EmailOrUsername;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class LoginRequest extends FormRequest
{
    use BaseUserRequest;
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
            'email_or_username' => [
                'required',
                'string',
                new EmailOrUsername()
            ],
            'password' => ['required', 'string']
        ];
    }

    public function messages(): array
    {
        return $this->commonMessages();
    }
}
