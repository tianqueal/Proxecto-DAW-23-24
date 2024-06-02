<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;

trait BaseNoteTopicRequest
{
    protected $minTopics;
    protected $maxTopics;

    public function __construct()
    {
        $this->minTopics = Config::get('rules.note.min_topics');
        $this->maxTopics = Config::get('rules.note.max_topics');
    }

    protected function commonRequiredNoteTopicRules(): array
    {
        $maxTopics = "max:{$this->maxTopics}";
        return [
            'topics_ids' => ['required', 'array', 'min:1', $maxTopics],
            'topics_ids.*' => ['exists:topics,id', 'numeric', 'distinct'],
        ];
    }

    protected function commonOptionalNoteTopicRules(): array
    {
        $maxTopics = "max:{$this->maxTopics}";
        $minTopics = "min:{$this->minTopics}";
        return [
            'topics_ids' => ['sometimes', 'array', $minTopics, $maxTopics],
            'topics_ids.*' => ['exists:topics,id', 'numeric', 'distinct'],
        ];
    }

    protected function commonMessages(): array
    {
        return [
            'topics_ids.required' => Lang::get('note.validate.topics_ids.required'),
            'topics_ids.array' => Lang::get('note.validate.topics_ids.array'),
            'topics_ids.min' => Lang::get('note.validate.topics_ids.min', ['min' => $this->minTopics]),
            'topics_ids.max' => Lang::get('note.validate.topics_ids.max', ['max' => $this->maxTopics]),
            'topics_ids.*.exists' => Lang::get('note.validate.topics_ids.exists', ['input' => ':input']),
            'topics_ids.*.numeric' => Lang::get('note.validate.topics_ids.numeric'),
            'topics_ids.*.distinct' => Lang::get('note.validate.topics_ids.distinct'),
        ];
    }
}
