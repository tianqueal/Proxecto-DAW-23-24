<?php

return [
    'not_found' => 'Nota no encontrada.',
    'validate' => [
        'content' => [
            'required' => 'El contenido es obligatorio.',
            'json' => 'El contenido debe ser un JSON válido.'
        ],
        'topics_ids' => [
            'required' => 'Los temas son obligatorios.',
            'array' => 'Los temas deben ser un array.',
            'min' => 'Se requiere al menos :min tema(s).',
            'max' => 'Se permiten como máximo :max temas.',
            'exists' => 'El tema con id :input no existe.',
            'numeric' => 'Los ids de los temas deben ser numéricos.',
            'distinct' => 'Los ids de los temas deben ser distintos.'
        ]
    ],
    'store' => [
        'success' => 'Nota creada con éxito.',
        'error' => 'No se pudo crear la nota.'
    ],
    'update' => [
        'success' => 'Nota actualizada con éxito.',
        'error' => 'No se pudo actualizar la nota.'
    ],
    'publish' => [
        'success' => 'Nota publicada con éxito.',
        'error' => 'No se pudo publicar la nota.',
        'already_published' => 'La nota ya está publicada.',
        'already_private' => 'La nota ya es privada.',
        'unpublish_success' => 'Nota despublicada con éxito.',
        'unpublish_error' => 'No se pudo despublicar la nota.'
    ],
    'delete' => [
        'success' => 'Nota eliminada con éxito.',
        'error' => 'No se pudo eliminar la nota.'
    ],
    'trashed_show' => [
        'notFound' => 'Nota no encontrada en la papelera.'
    ],
    'force_delete' => [
        'not_found' => 'Nota no encontrada en la papelera.',
        'success' => 'Nota eliminada permanentemente con éxito.',
        'error' => 'No se pudo eliminar permanentemente la nota.'
    ],
    'restore' => [
        'not_found' => 'Nota no encontrada en la papelera.',
        'success' => 'Nota restaurada con éxito.',
        'error' => 'No se pudo restaurar la nota.'
    ],
    'topic' => [
        'not_found' => 'Tema no encontrado.',
        'sync' => [
            'success' => 'Temas actualizados con éxito.',
            'error' => 'No se pudieron actualizar los temas.'
        ],
        'detach' => 'Temas desvinculados con éxito.'
    ],
];
