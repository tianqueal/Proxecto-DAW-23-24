<?php

return [
    'not_found' => 'Note not found.',
    'validate' => [
        'content' => [
            'required' => 'Content is required.',
            'json' => 'Content must be a valid JSON.'
        ],
        'topics_ids' => [
            'required' => 'Topics are required.',
            'array' => 'Topics must be an array.',
            'min' => 'At least :min topic(s) are required.',
            'max' => 'Maximum :max topics are allowed.',
            'exists' => 'Topic with id :input does not exist.',
            'numeric' => 'Topics ids must be numeric.',
            'distinct' => 'Topics ids must be distinct.'
        ]
    ],
    'store' => [
        'success' => 'Note created successfully.',
        'error' => 'Note could not be created.'
    ],
    'update' => [
        'success' => 'Note updated successfully.',
        'error' => 'Note could not be updated.'
    ],
    'publish' => [
        'success' => 'Note published successfully.',
        'error' => 'Note could not be published.',
        'already_published' => 'Note is already published.',
        'already_private' => 'Note is already private.',
        'unpublish_success' => 'Note unpublished successfully.',
        'unpublish_error' => 'Note could not be unpublished.'
    ],
    'delete' => [
        'success' => 'Note deleted successfully.',
        'error' => 'Note could not be deleted.'
    ],
    'trashed_show' => [
        'notFound' => 'Note not found in trash.'
    ],
    'force_delete' => [
        'not_found' => 'Note not found in trash.',
        'success' => 'Note permanently deleted successfully.',
        'error' => 'Note could not be permanently deleted.'
    ],
    'restore' => [
        'not_found' => 'Note not found in trash.',
        'success' => 'Note restored successfully.',
        'error' => 'Note could not be restored.'
    ],
    'topic' => [
        'not_found' => 'Topic not found.',
        'sync' => [
            'success' => 'Topics updated successfully.',
            'error' => 'Topics could not be updated.'
        ],
        'detach' => 'Topics detached successfully.'
    ]
];
