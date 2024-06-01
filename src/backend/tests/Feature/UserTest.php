<?php

namespace Tests\Feature;

//use Illuminate\Foundation\Testing\RefreshDatabase;
//use Illuminate\Foundation\Testing\WithFaker;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Config;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class UserTest extends TestCase
{
    use DatabaseTransactions;

    protected $apiPrefix;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->apiPrefix = Config::get('app.api_prefix');

        $this->user = User::factory()->create();
        Sanctum::actingAs($this->user);
    }

    /** @test */
    public function it_can_get_a_user()
    {
        $response = $this->actingAs($this->user)->get("{$this->apiPrefix}/user");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_can_update_a_user()
    {
        $response = $this->actingAs($this->user)->patch("{$this->apiPrefix}/user", [
            'username' => 'test_update',
        ]);

        $response->assertStatus(Response::HTTP_ACCEPTED);
    }

    /** @test */
    public function it_can_delete_a_user()
    {
        $response = $this->actingAs($this->user)->delete("{$this->apiPrefix}/user");

        $response->assertStatus(Response::HTTP_ACCEPTED);
    }

    /** @test */
    public function it_can_logout_othe_devices()
    {
        $response = $this->actingAs($this->user)->post("{$this->apiPrefix}/user/logout-other-devices");

        $response->assertStatus(Response::HTTP_ACCEPTED);
    }
}
