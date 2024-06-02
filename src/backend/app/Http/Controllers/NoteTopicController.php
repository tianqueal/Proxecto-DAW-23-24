<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteTopic\StoreNoteTopicRequest;
use App\Http\Requests\NoteTopic\UpdateNoteTopicRequest;
use App\Http\Resources\NoteResource;
use App\Http\Resources\NoteTopicResource;
use App\Models\Note;
use Illuminate\Support\Facades\Lang;
use Symfony\Component\HttpFoundation\Response;

class NoteTopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /* public function index()
    {
        //
    } */

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNoteTopicRequest $request, Note $note)
    {
        $this->authorize('update', $note);
        $topics = $request->validated();

        $note->topics()->sync($topics['topics_ids']);

        return response([
            'message' => Lang::get('note.topic.sync.success'),
            'note' => NoteResource::make($note->load('topics')),
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        $this->authorize('view', $note);

        return NoteTopicResource::make($note->load('topics'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNoteTopicRequest $request, Note $note)
    {
        $this->authorize('update', $note);
        $topics = $request->validated();

        $note->topics()->sync($topics['topics_ids']);

        return response([
            'message' => Lang::get('note.topic.sync.success'),
            'note' => NoteResource::make($note->load('topics')),
        ], Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $this->authorize('update', $note);

        $note->topics()->detach();

        return response([
            'message' => Lang::get('note.topic.detach'),
            'note' => NoteResource::make($note->load('topics')),
        ], Response::HTTP_ACCEPTED);
    }
}
