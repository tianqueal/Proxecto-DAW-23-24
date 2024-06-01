<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
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
    /* public function store(Request $request)
    {
        //
    } */

    /**
     * Display the specified resource.
     */
    public function show()
    {
        /** @var \App\Models\User $user **/ $user = Auth::user();
        return UserResource::make($user->load('roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request)
    {
        $newUserData = $request->safe()->only([
            'username',
            'email',
            'password',
        ]);

        /** @var \App\Models\User $user **/ $user = Auth::user();
        $user->update($newUserData);
        return response([
            'data' => [
                'message' => Lang::get('user.updated'),
                'user' => UserResource::make($user->load('roles'))
            ]
        ], Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        /** @var \App\Models\User $user **/
        $user = Auth::user();

        if (!$user) {
            return response(['data' => [
                'error' => [
                    'message' => Lang::get('user.not_authenticated')
                ]
            ]], 401);
        }

        try {
            $user->notes()->delete();
            $user->roles()->detach();
            $user->tokens()->delete();
            $user->delete();
        } catch (\Exception $e) {
            return response([
                'data' => [
                    [
                        'error' => [
                            'message' => Lang::get('user.delete_failed')
                        ]
                    ]
                ]
            ], 500);
        }

        return response([
            'data' => [
                'message' => Lang::get('user.deleted')
            ]
        ], Response::HTTP_ACCEPTED);
    }


    public function logoutOtherDevices()
    {
        /** @var \App\Models\User $user **/ $user = Auth::user();
        $user->tokens()->where('id', '!=', $user->currentAccessToken()->id)->delete();
        return response([
            'data' => [
                'message' => Lang::get('auth.logout_other_devices')
            ]
        ], Response::HTTP_ACCEPTED);
    }
}
