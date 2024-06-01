<?php

namespace Tests\Feature;


// use Illuminate\Foundation\Testing\RefreshDatabase;
// use Illuminate\Foundation\Testing\WithFaker;

use App\Models\Note;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Config;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class PublicRoutesTest extends TestCase
{
    use DatabaseTransactions;
    protected $apiPrefix;
    protected $note;

    protected function setUp(): void
    {
        parent::setUp();

        $this->apiPrefix = Config::get('app.api_prefix');
        $user = User::factory()->create();
        $this->note = Note::factory()->create(['user_id' => $user->id, 'is_public' => true]);
    }

    /** @test */
    public function it_lists_community_notes_for_unauthenticated_users(): void
    {
        $response = $this->get("{$this->apiPrefix}/public/communityNotes");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_shows_community_note_for_unauthenticated_users(): void
    {
        $response = $this->get("{$this->apiPrefix}/public/communityNotes/{$this->note->id}");

        $response->assertStatus(Response::HTTP_OK);
    }
}
