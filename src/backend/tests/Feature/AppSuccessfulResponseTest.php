<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use Illuminate\Support\Facades\Config;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class AppSuccessfulResponseTest extends TestCase
{
    /** @test */
    public function test_the_application_returns_a_successful_response(): void
    {
        $apiPrefix = Config::get('app.api_prefix');
        $response = $this->get($apiPrefix);

        $response->assertStatus(Response::HTTP_OK);
    }
}
