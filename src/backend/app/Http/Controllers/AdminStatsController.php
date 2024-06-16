<?php

namespace App\Http\Controllers;

use App\Http\Resources\TopicResource;
use App\Models\Note;
use App\Models\Role;
use App\Models\Topic;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class AdminStatsController extends Controller
{
    public function index()
    {
        $userCount = User::count();
        $noteCount = Note::count();
        $communityNoteCount = Note::where('is_public', true)->count();
        $topicCount = Topic::count();
        $roleCount = Role::count();
        $notesPerUser = User::withCount('notes')->get()->avg('notes_count');
        $topicsPerNote = Note::withCount('topics')->get()->avg('topics_count');
        $usersWithRolesCount = User::withCount('roles')->get();
        $rolesPerUser = $usersWithRolesCount->avg('roles_count');

        // Users with more than one role
        $usersWithMultipleRoles = User::has('roles', '>', 1)->count();

        // Notes without topics
        $notesWithoutTopics = Note::doesntHave('topics')->count();

        // Notes created last month
        $lastMonth = now()->subMonth();
        $notesLastMonth = Note::where('created_at', '>=', $lastMonth)->count();

        // Top topics
        $topTopics = Topic::withCount('notes')
            ->orderBy('notes_count', 'desc')
            ->take(5)
            ->get()
            ->map(
                fn ($topic) =>
                array_merge(TopicResource::make($topic)->toArray(request()), ['notesCount' => $topic->notes_count])
            );

        // Users created today
        $today = now()->startOfDay();
        $usersToday = User::where('created_at', '>=', $today)->count();

        // Users verified
        $verifiedUsersCount = User::whereNotNull('email_verified_at')->count();

        // Connected users
        $onlineUsersCount = Sanctum::personalAccessTokenModel()::distinct('tokenable_id')
            ->count('tokenable_id');

        return response()->json([
            'data' => [
                'stats' => [
                    'users' => $userCount,
                    'notes' => $noteCount,
                    'communityNotes' => $communityNoteCount,
                    'topics' => $topicCount,
                    'roles' => $roleCount,
                    'averageNotesPerUser' => $notesPerUser,
                    'averageTopicsPerNote' => $topicsPerNote,
                    'averageRolesPerUser' => $rolesPerUser,
                    'usersWithMultipleRoles' => $usersWithMultipleRoles,
                    'notesWithoutTopics' => $notesWithoutTopics,
                    'notesLastMonth' => $notesLastMonth,
                    'topTopics' => $topTopics,
                    'usersToday' => $usersToday,
                    'verifiedUsers' => $verifiedUsersCount,
                    'onlineUsers' => $onlineUsersCount
                ],
            ],
        ]);
    }
}
