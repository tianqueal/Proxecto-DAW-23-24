<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
// use Illuminate\Foundation\Testing\WithFaker;

use App\Models\Role;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Config;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class AdminRoutesTest extends TestCase
{
    use DatabaseTransactions;
    protected $apiPrefix;

    protected function setUp(): void
    {
        parent::setUp();

        $this->apiPrefix = Config::get('app.api_prefix');

        $roleAdmin = Role::factory()->create(['name' => Config::get('default_roles.default_admin')]);
        $user = User::factory()->create(['email_verified_at' => now()]);
        $user->roles()->attach($roleAdmin->id);
        Sanctum::actingAs($user);
    }

    /** @test */
    public function it_can_access_admin_test_route()
    {
        $response = $this->get("{$this->apiPrefix}/admin/test");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_can_access_admin_users_route()
    {
        $response = $this->get("{$this->apiPrefix}/admin/users");

        $response->assertStatus(Response::HTTP_OK);
    }

    /* public function it_can_access_admin_roles_route()
    {
        $response = $this->get("{$this->apiPrefix}/admin/roles");

        $response->assertStatus(Response::HTTP_OK);
    } */

    /** @test */
    public function it_can_access_admin_notes_route()
    {
        $response = $this->get("{$this->apiPrefix}/admin/notes");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_can_access_admin_topics_route()
    {
        $topic = Topic::factory()->create();
        $responseIndex = $this->get("{$this->apiPrefix}/admin/topics");
        $responseShow = $this->get("{$this->apiPrefix}/admin/topics/{$topic->id}");

        $responseIndex->assertStatus(Response::HTTP_OK);
        $responseShow->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_cannot_access_admin_route()
    {
        $otherRole = Role::factory()->create();
        $user = User::factory()->create();
        $user->roles()->attach($otherRole->id);
        Sanctum::actingAs($user);

        $response = $this->get("{$this->apiPrefix}/admin/test");

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }
}
