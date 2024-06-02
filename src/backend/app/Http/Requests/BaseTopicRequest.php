<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Lang;

trait BaseTopicRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function commonRequiredTopicRules(): array
    {
        return [
            'name' => ['required', 'unique:topics', 'string', 'max:100'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function commonMessages(): array
    {
        return [
            'name.required' => Lang::get('validation.topic.name.required'),
            'name.unique' => Lang::get('validation.topic.name.unique'),
            'name.string' => Lang::get('validation.topic.'),
            'name.max' => Lang::get('validation.topic.name.max', ['max' => 100]),
        ];
    }
}
