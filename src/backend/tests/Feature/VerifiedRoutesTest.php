<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
// use Illuminate\Foundation\Testing\WithFaker;

use App\Models\Note;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Config;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class VerifiedRoutesTest extends TestCase
{
    use DatabaseTransactions;

    protected $apiPrefix;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->apiPrefix = Config::get('app.api_prefix');

        $this->user = User::factory()->create(['email_verified_at' => now()]);
        Sanctum::actingAs($this->user);
    }

    /** @test */
    public function it_can_access_verified_test_route()
    {
        $response = $this->get("{$this->apiPrefix}/verified/test");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_can_publish_a_note()
    {
        $note = Note::factory()->create(['user_id' => $this->user->id, 'is_public' => false]);

        $response = $this->post("{$this->apiPrefix}/notes/{$note->id}/publish");

        $response->assertStatus(Response::HTTP_CREATED);
    }

    /** @test */
    public function it_can_unpublish_a_note()
    {
        $note = Note::factory()->create(['user_id' => $this->user->id, 'is_public' => true]);

        $response = $this->post("{$this->apiPrefix}/notes/{$note->id}/unpublish");

        $response->assertStatus(Response::HTTP_ACCEPTED);
    }
}
