<?php

namespace App\Http\Controllers\PublicControllers;

use App\Filters\NoteFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\NoteFilteredResource;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Symfony\Component\HttpFoundation\Response;

class NoteCommunityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $noteFilters = Config::get('query_filters.note');

        $filter = new NoteFilter($noteFilters->filters);
        $query = Note::publicNotes()
            ->orderBy($noteFilters->sorting, $noteFilters->order)
            ->with(['user', 'topics']);

        $query = $filter->apply($request, $query);

        $communityNotes = $query->paginate($noteFilters->perPage);

        return NoteFilteredResource::collection($communityNotes);
    }

    /**
     * Store a newly created resource in storage.
     */
    /* public function store(Request $request)
    {
        return response([
            'data' => [
                'message' => 'This is the store method of the NoteCommunityController.',
                'request' => $request->all()
            ]
        ]);
    } */

    /**
     * Display the specified resource.
     */
    public function show(Note $communityNote)
    {
        if ($communityNote->isPrivate()) {
            return response([
                'data' => [
                    'message' => Lang::get('note.not_found')
                ]
            ], Response::HTTP_NOT_FOUND);
        }

        $communityNote->loadMissing(['user', 'topics']);

        return NoteResource::make($communityNote);
    }

    /**
     * Update the specified resource in storage.
     */
    /* public function update(Request $request, string $id)
    {
        //
    } */

    /**
     * Remove the specified resource from storage.
     */
    /* public function destroy(string $id)
    {
        //
    } */

    public function publish(Note $note)
    {
        $this->authorize('managePublication', $note);

        if ($note->isPublic()) {
            return response([
                'data' => [
                    'message' => Lang::get('note.publish.already_published')
                ]
            ], Response::HTTP_CONFLICT);
        }

        $note->publish();

        return response([
            'data' => [
                'message' => Lang::get('note.publish.success')
            ]
        ], Response::HTTP_CREATED);
    }

    public function unpublish(Note $note)
    {
        $this->authorize('managePublication', $note);

        if ($note->isPrivate()) {
            return response([
                'data' => [
                    'message' => Lang::get('note.publish.already_private')
                ]
            ], Response::HTTP_CONFLICT);
        }

        $note->unpublish();

        return response([
            'data' => [
                'message' => Lang::get('note.publish.unpublish_success')
            ]
        ], Response::HTTP_ACCEPTED);
    }
}
