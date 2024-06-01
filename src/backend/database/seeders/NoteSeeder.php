<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Note;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Support\Facades\Config;

class NoteSeeder extends Seeder
{
    public function run(): void
    {
        $topicIds = Topic::all()->pluck('id')->toArray();
        $users = User::whereDoesntHave('roles', function ($query) {
            $query->where('name', Config::get('default_roles.default_admin'));
        })
            ->where('username', '!=', ['test', 'test_verified'])
            ->get();
        $userTestVerified = User::where('username', 'test_verified')->first();
        $userTest = User::where('username', 'test')->first();

        Note::factory()
            ->create([
                'user_id' => $userTestVerified->id,
                'is_public' => true,
            ])
            ->topics()->attach(
                fake()->randomElements(
                    $topicIds,
                    fake()->numberBetween(0, 5)
                )
            );

        Note::factory()
            ->create([
                'user_id' => $userTest->id,
                'is_public' => false,
            ])
            ->topics()->attach(
                fake()->randomElements(
                    $topicIds,
                    fake()->numberBetween(0, 5)
                )
            );

        foreach ($users as $user) {
            for ($i = 0; $i < 5; $i++) {
                $note = Note::factory()
                    ->create([
                        'user_id' => $user->id,
                        'is_public' => $user->isEmailVerified() ? fake()->boolean() : false,
                    ]);

                $note->topics()->attach(
                    fake()->randomElements(
                        $topicIds,
                        fake()->numberBetween(0, 5)
                    )
                );
            }
        }
    }
}
