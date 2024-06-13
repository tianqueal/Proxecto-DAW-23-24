<?php

use App\Http\Controllers\AdminNoteController;
use App\Http\Controllers\AdminRoleController;
use App\Http\Controllers\AdminStatsController;
use App\Http\Controllers\AdminTopicController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\NoteTopicController;
use App\Http\Controllers\PublicControllers\NoteCommunityController;
// use App\Http\Controllers\RoleController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificationController;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers'], function () {
    Route::get('/', function () {
        return response(['data' => [
            'message' => Lang::get('auth.welcome'),
            'documentation' => 'https://github.com/tianqueal/Proxecto-DAW-23-24/',
            'allowedLocales' => Config::get('locales.allowed'),
            'author' => 'tianqueal',
            'license' => 'MIT',
        ]]);
    });

    // Rutes for all users (unauthenticated and authenticated)
    Route::group(
        [
            'prefix' => 'public',
            'namespace' => 'PublicControllers',
        ],
        function () {
            Route::get('test', function () {
                return response(['message' => Lang::get('auth.test_guest')]);
            });

            Route::apiResource(
                'communityNotes',
                NoteCommunityController::class
            )->only(['index', 'show']);
        }
    );

    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    /* Route::get(
        'email/verify/{id}',
        [VerificationController::class, 'verify']
    )->middleware(['signed'])->name('verification.verify'); */

    Route::apiResource('topics', TopicController::class)->only(['index', 'show']);

    // Rutes for authenticated users
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('auth/test', function () {
            /** @var \App\Models\User $user **/ $user = Auth::user();

            return response(
                ['data' => [
                    'message' => Lang::get('auth.test_authenticated'),
                    'user' => UserResource::make($user->loadMissing('roles')),
                    'is_email_verified' => $user->isEmailVerified()
                ]],
                Response::HTTP_OK
            );
        });

        Route::post('logout', [AuthController::class, 'logout']);

        Route::get(
            'email/resend',
            [VerificationController::class, 'resend']
        )->name('verification.resend');

        Route::get('notes/trashed', [NoteController::class, 'trashedIndex']);
        Route::get('notes/trashed/{trashedNote}', [NoteController::class, 'trashedShow']);
        Route::delete('notes/{trashedNote}/force', [NoteController::class, 'forceDelete']);
        Route::post('notes/{trashedNote}/restore', [NoteController::class, 'restore']);
        Route::apiResource('notes', NoteController::class);

        Route::get('notes/{note}/topics', [NoteTopicController::class, 'show']);
        Route::post('notes/{note}/topics', [NoteTopicController::class, 'store']);
        Route::put('notes/{note}/topics', [NoteTopicController::class, 'update']);
        Route::delete('notes/{note}/topics', [NoteTopicController::class, 'destroy']);

        Route::group(['prefix' => 'user'], function () {
            Route::get('/', [UserController::class, 'show']);
            Route::patch('/', [UserController::class, 'update']);
            Route::delete('/', [UserController::class, 'destroy']);
            Route::post('/logout-other-devices', [UserController::class, 'logoutOtherDevices']);
        });

        // Rutes for authenticated users with verified email
        Route::group(['middleware' => ['verified']], function () {
            Route::get('verified/test', function () {
                /** @var \App\Models\User $user **/ $user = Auth::user();

                return response(
                    ['data' => [
                        'message' => Lang::get('auth.test_verified'),
                        'user' => UserResource::make($user->loadMissing('roles')),
                        'is_email_verified' => $user->isEmailVerified()
                    ]],
                    Response::HTTP_OK
                );
            });

            Route::post(
                'notes/{note}/publish',
                [NoteCommunityController::class, 'publish']
            );

            Route::post(
                'notes/{note}/unpublish',
                [NoteCommunityController::class, 'unpublish']
            );
        });

        // Rutes for admin role
        Route::group(['prefix' => 'admin', 'middleware' => ['role:Admin']], function () {
            Route::get('test', function () {
                /** @var \App\Models\User $user **/ $user = Auth::user();

                return response(
                    ['data' => [
                        'message' => Lang::get('auth.test_admin'),
                        'user' => UserResource::make($user->loadMissing('roles')),
                        'is_email_verified' => $user?->isEmailVerified()
                    ]],
                    Response::HTTP_OK
                );
            });

            Route::apiResource('users', AdminUserController::class);

            Route::apiResource('notes', AdminNoteController::class)->names([
                'index' => 'admin.notes.index',
                'show' => 'admin.notes.show',
                /* 'store' => 'admin.notes.store', */
                'update' => 'admin.notes.update',
                'destroy' => 'admin.notes.destroy',
            ])->except(['store']);

            Route::apiResource('topics', AdminTopicController::class)->names([
                'index' => 'admin.topics.index',
                'show' => 'admin.topics.show',
                'store' => 'admin.topics.store',
                'update' => 'admin.topics.update',
                'destroy' => 'admin.topics.destroy',
            ]);

            Route::apiResource('stats', AdminStatsController::class)->only(['index']);

            // Routes for roles. Future implementation in the frontend
            Route::apiResource('roles', AdminRoleController::class)->names([
                'index' => 'admin.roles.index',
                'show' => 'admin.roles.show',
                'store' => 'admin.roles.store',
                'update' => 'admin.roles.update',
                'destroy' => 'admin.roles.destroy',
            ]);
        });
    });
});
