<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rules\Password;

trait BaseUserRequest
{
    protected function commonRequiredUserRules(): array
    {
        return [
            'username' => [
                'required',
                'unique:users',
                'regex:' . Config::get('regex.username')
            ],
            'email' => ['required', 'unique:users', 'email'],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ],
            'email_verified_at' => ['sometimes', 'date', 'nullable'],
            'roles' => ['sometimes', 'array', 'distinct'],
            'roles.*' => ['numeric', 'exists:roles,id'],
        ];
    }

    protected function commonOptionalUserRules(): array
    {
        return [
            'username' => [
                'sometimes',
                'unique:users',
                'regex:' . Config::get('regex.username')
            ],
            'email' => ['sometimes', 'unique:users', 'email'],
            'password' => [
                'sometimes',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ],
            'email_verified_at' => ['sometimes', 'date', 'nullable'],
            'roles' => ['sometimes', 'array', 'distinct'],
            'roles.*' => ['numeric', 'exists:roles,id'],
        ];
    }

    protected function commonMessages(): array
    {
        return [
            'username.required' => Lang::get('validation.username.required'),
            'username.unique' => Lang::get('validation.username.unique'),
            'username.regex' => Lang::get('validation.username.regex'),
            'email.required' => Lang::get('validation.email.required'),
            'email.unique' => Lang::get('validation.email.unique'),
            'email.email' => Lang::get('validation.email.email'),
            'password.required' => Lang::get('validation.password.required'),
            'password.confirmed' => Lang::get('validation.password.confirmed'),
            'password.min' => Lang::get('validation.password.min'),
            'password.mixed_case' => Lang::get('validation.password.mixed_case'),
            'password.numbers' => Lang::get('validation.password.numbers'),
            'password.symbols' => Lang::get('validation.password.symbols'),
            'email_or_username.required' => Lang::get('validation.email_or_username.required'),
            'email_or_username.validate' => Lang::get('validation.email_or_username.validate'),
            'roles.sometimes' => Lang::get('validation.roles.sometimes'),
            'roles.array' => Lang::get('validation.roles.array'),
            'roles.distinct' => Lang::get('validation.roles.distinct'),
            'roles.*.numeric' => Lang::get('validation.roles.*.numeric'),
            'roles.*.exists' => Lang::get('validation.roles.*.exists'),
        ];
    }
}
