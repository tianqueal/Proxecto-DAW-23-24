<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
// use Illuminate\Foundation\Testing\WithFaker;

use App\Models\Note;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Config;
use Laravel\Sanctum\Sanctum;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class NoteTest extends TestCase
{
    use DatabaseTransactions;

    protected $apiPrefix;
    protected $user;
    protected $topic;

    protected function setUp(): void
    {
        parent::setUp();

        $this->apiPrefix = Config::get('app.api_prefix');

        $this->user = User::factory()->create();
        $this->topic = Topic::factory()->create();
        Sanctum::actingAs($this->user);
    }

    /** @test */
    public function it_can_list_notes()
    {
        $response = $this->get("{$this->apiPrefix}/notes");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_can_create_a_note()
    {
        $response = $this->post("{$this->apiPrefix}/notes", [
            'content' => json_encode(['blocks' => [['type' => 'paragraph', 'data' => ['text' => 'Test content']]]]),
        ]);

        $response->assertStatus(Response::HTTP_CREATED);
    }

    /** @test */
    public function it_can_show_a_note()
    {
        $note = Note::factory()->create(['user_id' => $this->user->id]);

        $response = $this->get("{$this->apiPrefix}/notes/{$note->id}");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_can_update_a_note()
    {
        $note = Note::factory()->create(['user_id' => $this->user->id]);

        $response = $this->patch("{$this->apiPrefix}/notes/{$note->id}", [
            'content' => json_encode(['blocks' => [['type' => 'paragraph', 'data' => ['text' => 'Test content 2']]]]),
        ]);

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_can_delete_a_note()
    {
        $note = Note::factory()->create(['user_id' => $this->user->id]);

        $response = $this->delete("{$this->apiPrefix}/notes/{$note->id}");

        $response->assertStatus(Response::HTTP_ACCEPTED);
    }

    /** @test */
    public function it_can_get_trashed_notes()
    {
        $response = $this->get("{$this->apiPrefix}/notes/trashed");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_can_get_a_trashed_note()
    {
        $note = Note::factory()->create(['user_id' => $this->user->id, 'deleted_at' => now()]);

        $response = $this->get("{$this->apiPrefix}/notes/trashed/{$note->id}");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_can_force_delete_a_trashed_note()
    {
        $note = Note::factory()->create(['user_id' => $this->user->id, 'deleted_at' => now()]);

        $response = $this->delete("{$this->apiPrefix}/notes/{$note->id}/force");

        $response->assertStatus(Response::HTTP_ACCEPTED);
    }

    /** @test */
    public function it_can_restore_a_trashed_note()
    {
        $note = Note::factory()->create(['user_id' => $this->user->id, 'deleted_at' => now()]);

        $response = $this->post("{$this->apiPrefix}/notes/{$note->id}/restore");

        $response->assertStatus(Response::HTTP_ACCEPTED);
    }

    /** @test */
    public function it_can_get_a_note_topics()
    {
        $note = Note::factory()->create(['user_id' => $this->user->id]);

        $response = $this->get("{$this->apiPrefix}/notes/{$note->id}/topics");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_can_sync_a_note_topic()
    {
        $note = Note::factory()->create(['user_id' => $this->user->id]);
        $topic = Topic::limit(1)->get()->first();

        $response = $this->put("{$this->apiPrefix}/notes/{$note->id}/topics", ['topics_ids' => [$topic->id]]);

        $response->assertStatus(Response::HTTP_ACCEPTED);
    }
}
