<?php

namespace Tests\Feature;

//use Illuminate\Foundation\Testing\RefreshDatabase;
// use Illuminate\Foundation\Testing\WithFaker;

use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class DatabaseTest extends TestCase
{
    /**
     * @group database
     * @test
     */
    public function test_database_is_seeded(): void
    {
        Artisan::call('migrate:refresh', ['--seed' => true]);

        $this->assertDatabaseHas('users', [
            'email' => 'test@masternote.com',
        ]);
    }
}
