<?php

namespace App\Http\Controllers;

use App\Filters\NoteFilter;
use App\Http\Requests\UpdateAdminNoteRequest;
use App\Http\Resources\NoteFilteredResource;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use App\Rules\NoteIsPublic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;

class AdminNoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $noteFilters = Config::get('query_filters.note');

        $filter = new NoteFilter($noteFilters->filters);
        $query = Note::orderBy($noteFilters->sorting, $noteFilters->order)
            ->with('topics')->where('is_public', true);

        $query = $filter->apply($request, $query);

        $notes = $query->paginate($noteFilters->perPage);

        return NoteFilteredResource::collection($notes);
    }

    /**
     * Store a newly created resource in storage.
     */
    /* public function store(Request $request)
    {
        //
    } */

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Note $note)
    {
        if (!(new NoteIsPublic())->passes('id', $note->id)) {
            return response([
                'data' => [
                    'message' => Lang::get('validation.note.not_found_or_not_public'),
                ],
            ]);
        }

        return NoteResource::make($note->load('topics'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdminNoteRequest $request, Note $note)
    {
        $newStatus = $request->safe()->only('is_public');

        $note->update($newStatus);

        return NoteResource::make($note);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        if (!(new NoteIsPublic())->passes('id', $note->id)) {
            return response([
                'data' => [
                    'message' => Lang::get('validation.note.not_found_or_not_public'),
                ],
            ]);
        }

        $note->delete();

        return response([
            'data' => [
                'message' => Lang::get('note.delete.success'),
            ],
        ]);
    }
}
