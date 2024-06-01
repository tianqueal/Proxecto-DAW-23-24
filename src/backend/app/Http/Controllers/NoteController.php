<?php

namespace App\Http\Controllers;

use App\Filters\NoteFilter;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Http\Resources\NoteFilteredResource;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Symfony\Component\HttpFoundation\Response;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $noteFilters = Config::get('query_filters.note');

        /** @var \App\Models\User $user **/ $user = Auth::user();

        $filter = new NoteFilter($noteFilters->filters);
        $query = $user->notes()
            ->orderBy($noteFilters->sorting, $noteFilters->order)
            ->with('topics');

        $query = $filter->apply($request, $query->getQuery());

        $notes = $query->paginate($noteFilters->perPage);

        return NoteFilteredResource::collection($notes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNoteRequest $request)
    {
        $note = $request->validated();

        /** @var \App\Models\User $user **/ $user = Auth::user();
        $note = $user->notes()->create($note);

        return NoteResource::make($note);
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        $this->authorize('view', $note);

        return NoteResource::make($note->load('topics'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNoteRequest $request, Note $note)
    {
        $this->authorize('update', $note);

        $note->update($request->validated());

        return NoteResource::make($note);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $this->authorize('delete', $note);

        $note->delete();

        return response(['data' => [
            'message' => Lang::get('note.delete.success')
        ]], Response::HTTP_ACCEPTED);
    }

    public function trashedIndex()
    {
        $trashedNotes = Note::onlyTrashed()
            ->where('user_id', Auth::id())
            ->with('topics')
            ->get();

        return NoteFilteredResource::collection($trashedNotes);
    }

    public function trashedShow(Note $trashedNote)
    {
        $this->authorize('view', $trashedNote);

        return NoteResource::make($trashedNote);
    }

    public function forceDelete(Note $trashedNote)
    {
        $this->authorize('forceDelete', $trashedNote);

        $trashedNote->forceDelete();

        return response(['data' => [
            'message' => Lang::get('note.force_delete.success')
        ]], Response::HTTP_ACCEPTED);
    }

    public function restore(Note $trashedNote)
    {
        $this->authorize('restore', $trashedNote);

        $trashedNote->restore();

        return response(['data' => [
            'message' => Lang::get('note.restore.success')
        ]], Response::HTTP_ACCEPTED);
    }
}
