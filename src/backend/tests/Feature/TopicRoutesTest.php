<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
// use Illuminate\Foundation\Testing\WithFaker;

use App\Models\Topic;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Config;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class TopicRoutesTest extends TestCase
{
    use DatabaseTransactions;

    protected $apiPrefix;
    protected $topic;

    protected function setUp(): void
    {
        parent::setUp();

        $this->apiPrefix = Config::get('app.api_prefix');
        $this->topic = Topic::factory()->create();
    }

    /** @test */
    public function it_lists_all_topics()
    {
        $response = $this->get("{$this->apiPrefix}/topics");

        $response->assertStatus(Response::HTTP_OK);
    }

    /** @test */
    public function it_shows_a_single_topic()
    {
        $response = $this->get("{$this->apiPrefix}/topics/{$this->topic->id}");

        $response->assertStatus(Response::HTTP_OK);
    }
}
