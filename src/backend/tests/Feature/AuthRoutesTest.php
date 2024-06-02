<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
// use Illuminate\Foundation\Testing\WithFaker;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Config;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class AuthRoutesTest extends TestCase
{
    use DatabaseTransactions;

    protected $apiPrefix;

    protected function setUp(): void
    {
        parent::setUp();

        $this->apiPrefix = Config::get('app.api_prefix');

        Role::factory()->create(['name' => Config::get('default_roles.default_user')]);
    }

    /** @test */
    public function it_registers_a_new_user()
    {
        $response = $this->post("{$this->apiPrefix}/register", [
            'username' => 'test_register',
            'email' => 'test_register@example.com',
            'password' => 'Abcd12345$',
            'password_confirmation' => 'Abcd12345$',
        ]);

        $response->assertStatus(Response::HTTP_CREATED);
    }

    /** @test */
    public function it_logs_in_an_existing_user()
    {
        $this->post("{$this->apiPrefix}/register", [
            'username' => 'test_register',
            'email' => 'test_register@example.com',
            'password' => 'Abcd12345$',
            'password_confirmation' => 'Abcd12345$',
        ]);

        $responseWithEmail = $this->post("{$this->apiPrefix}/login", [
            'email_or_username' => 'test_register@example.com',
            'password' => 'Abcd12345$',
        ]);

        $responseWithUsername = $this->post("{$this->apiPrefix}/login", [
            'email_or_username' => 'test_register',
            'password' => 'Abcd12345$',
        ]);

        $responseWithEmail->assertStatus(Response::HTTP_OK);
        $responseWithUsername->assertStatus(Response::HTTP_OK);

        $responseWithEmail->assertJsonStructure([
            'data' => [
                'access_token'
            ]
        ]);

        $responseWithUsername->assertJsonStructure([
            'data' => [
                'access_token'
            ]
        ]);
    }

    /** @test */
    public function it_tests_authenticated_user()
    {

        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->get("{$this->apiPrefix}/user");

        $response->assertStatus(Response::HTTP_OK)
            ->assertJson([
                'data' => [
                    'id' => $user->id,
                ]
            ]);
    }

    /** @test */
    public function it_tests_logout()
    {

        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->post("{$this->apiPrefix}/logout");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_tests_email_resend()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->get(route('verification.resend'));

        $response->assertStatus(Response::HTTP_OK);
    }
}
