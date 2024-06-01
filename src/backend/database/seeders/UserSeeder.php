<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $defaultUserRole = Role::where('name', Config::get('default_roles.default_user'))->first();
        $adminRole = Role::where('name', Config::get('default_roles.default_admin'))->first();

        $adminUser = User::factory()->createOne([
            'username' => 'admin',
            'email' => 'admin@masternote.com',
            'password' => Hash::make('Abcd12345$')
        ]);

        if ($adminUser && !$adminUser->roles()->find($adminRole->id)) {
            $adminUser->roles()->attach($adminRole->id);
        }

        $verifiedTestUser = User::factory()->createOne([
            'username' => 'test_verified',
            'email' => 'test_verified@masternote.com',
            'password' => Hash::make('Abcd12345$')
        ]);

        if ($verifiedTestUser && !$verifiedTestUser->roles()->find($defaultUserRole->id)) {
            $verifiedTestUser->roles()->attach($defaultUserRole->id);
        }

        $unverifiedTestUser = User::factory()->unverified()->createOne([
            'username' => 'test',
            'email' => 'test@masternote.com',
            'password' => Hash::make('Abcd12345$')
        ]);

        if ($unverifiedTestUser && !$unverifiedTestUser->roles()->find($defaultUserRole->id)) {
            $unverifiedTestUser->roles()->attach($defaultUserRole->id);
        }

        User::factory()->count(30)->create()->each(function ($user) use ($defaultUserRole) {
            if (!$user->roles()->find($defaultUserRole->id)) {
                $user->roles()->attach($defaultUserRole->id);
            }
        });

        User::factory()->unverified()->count(10)->create()->each(function ($user) use ($defaultUserRole) {
            if (!$user->roles()->find($defaultUserRole->id)) {
                $user->roles()->attach($defaultUserRole->id);
            }
        });
    }
}
