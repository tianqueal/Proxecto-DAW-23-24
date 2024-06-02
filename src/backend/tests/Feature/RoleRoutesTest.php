<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Config;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class RoleRoutesTest extends TestCase
{
    use DatabaseTransactions;

    protected $apiPrefix;
    protected $role;
    protected $userAdmin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->apiPrefix = config('app.api_prefix');
        $this->role = Role::factory()->create();
        $this->userAdmin = User::factory()->create(['username' => 'test_admin']);
        $this->userAdmin->assignRole(Config::get('default_roles.default_admin'));
        Sanctum::actingAs($this->userAdmin);
    }

    /** @test */
    public function it_lists_all_roles()
    {
        $response = $this->get("{$this->apiPrefix}/admin/roles");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_shows_a_single_role()
    {
        $response = $this->get("{$this->apiPrefix}/admin/roles/{$this->role->id}");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_creates_a_new_role()
    {
        $data = [
            'name' => 'New Role',
        ];

        $response = $this->post("{$this->apiPrefix}/admin/roles", $data);

        $response->assertStatus(Response::HTTP_CREATED);
        $this->assertDatabaseHas('roles', ['name' => 'New Role']);
    }

    /** @test */
    public function it_updates_a_role()
    {
        $data = [
            'name' => 'Updated Role',
        ];

        $response = $this->put("{$this->apiPrefix}/admin/roles/{$this->role->id}", $data);

        $response->assertStatus(Response::HTTP_OK);
        $this->assertDatabaseHas('roles', ['name' => 'Updated Role']);
    }

    /** @test */
    public function it_deletes_a_role()
    {
        $response = $this->delete("{$this->apiPrefix}/admin/roles/{$this->role->id}");

        $response->assertStatus(Response::HTTP_NO_CONTENT);
        $this->assertSoftDeleted('roles', ['id' => $this->role->id]);
    }
}
