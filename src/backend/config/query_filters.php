<?php

return [
    'user' => (object) [
        'filters' => [
            'id' => 'id',
            'email' => 'email',
            'username' => 'username'
        ],
        'sorting' => 'id',
        'order' => 'asc',
        'perPage' => 10,
    ],
    'note' => (object) [
        'filters' => [
            'userId' => 'user_id',
            'username' => 'username',
            'topicId' => 'topic_id',
            'content' => 'content'
        ],
        'sorting' => 'updated_at',
        'order' => 'desc',
        'perPage' => 15
    ],
    'topic' => (object) [
        'filters' => [
            'id' => 'id',
            'name' => 'name',
        ],
        'sorting' => 'id',
        'order' => 'asc',
        'perPage' => 15
    ]
];
