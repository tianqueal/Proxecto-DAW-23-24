<?php

namespace App\Rules;

use App\Models\Note;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Lang;

class NoteIsPublic implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $note = Note::find($value);
        if (!$note || !$note->is_public) {
            $fail(Lang::get('validation.note.not_found_or_not_public'));
        }
    }

    public function passes(string $attribute, int $value)
    {
        $note = Note::find($value);
        return $note && $note->is_public;
    }
}
