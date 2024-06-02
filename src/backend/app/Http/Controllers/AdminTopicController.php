<?php

namespace App\Http\Controllers;

use App\Filters\TopicFilter;
use App\Http\Requests\StoreTopicRequest;
use App\Http\Requests\UpdateTopicRequest;
use App\Http\Resources\TopicResource;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;

class AdminTopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $topicFilters = Config::get('query_filters.topic');
        $filter = new TopicFilter($topicFilters->filters);

        $query = Topic::orderBy($topicFilters->sorting, $topicFilters->order);

        $topics = $filter->apply($request, $query->newQuery());

        $topics = $topics->paginate($topicFilters->perPage);

        return TopicResource::collection($topics);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTopicRequest $request)
    {
        $nameTopic = $request->safe()->only('name');

        $topic = Topic::create($nameTopic);

        return TopicResource::make($topic);
    }

    /**
     * Display the specified resource.
     */
    public function show(Topic $topic)
    {
        return TopicResource::make($topic);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTopicRequest $request, Topic $topic)
    {
        $nameTopic = $request->safe()->only('name');

        $topic->update($nameTopic);

        return TopicResource::make($topic);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Topic $topic)
    {
        $topic->delete();

        return response(
            ['data' => ['message' => Lang::get('topics.deleted')]]
        );
    }
}
