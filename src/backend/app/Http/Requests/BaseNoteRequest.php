<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Lang;

trait BaseNoteRequest
{
    protected function commonRequiredNoteRules(): array
    {
        return [
            'content' => ['required', 'json'],
        ];
    }

    protected function commonMessages(): array
    {
        return [
            'content.required' => Lang::get('note.validate.content.required'),
            'content.json' => Lang::get('note.validate.content.json'),
        ];
    }
}
