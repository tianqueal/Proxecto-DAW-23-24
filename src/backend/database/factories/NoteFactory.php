<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        return [
            'content' => json_encode([
                'time' => now()->timestamp * 1000,
                'blocks' => [
                    [
                        'id' => Str::random(10),
                        'type' => 'header',
                        'data' => [
                            'text' => fake()->sentence(),
                            'level' => 2
                        ]
                    ],
                    [
                        'id' => Str::random(10),
                        'type' => 'paragraph',
                        'data' => [
                            'text' => fake()->paragraph()
                        ]
                    ]
                ],
                'version' => Config::get('editorjs.version')
            ]),
            'is_public' => false,
        ];
    }
}
