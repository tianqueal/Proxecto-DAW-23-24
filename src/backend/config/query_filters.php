<?php

return [
    'user' => (object) [
        'filters' => [
            'id' => 'id',
            'email' => 'email',
            'username' => 'username'
        ],
        'sorting' => 'username',
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
        'sorting' => 'name',
        'order' => 'asc',
        'perPage' => 15
    ]
];
