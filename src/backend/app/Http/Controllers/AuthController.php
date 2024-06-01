<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Lang;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validatedData = $request->safe()->only([
            'username',
            'email',
            'password',
        ]);
        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);
        $user->assignRole(Config::get('default_roles.default_user'));

        $accessToken = $user->createToken(Config::get('auth.token'))->plainTextToken;

        event(new Registered($user));

        return response(
            [
                'data' => [
                    'message' => Lang::get('auth.registered'),
                    'user' => $user,
                    'access_token' => $accessToken
                ],
            ],
            Response::HTTP_CREATED
        );
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->safe()->only('email_or_username', 'password');

        // Try to authenticate with the email
        if (Auth::attempt([
            'email' => $credentials['email_or_username'],
            'password' => $credentials['password']
        ])) {
            /** @var \App\Models\User $user **/ $user = Auth::user();
        } elseif (Auth::attempt([
            'username' => $credentials['email_or_username'],
            'password' => $credentials['password']
        ])) {
            /** @var \App\Models\User $user **/ $user = Auth::user();
        } else {
            return response([
                'errors' => Lang::get('auth.failed')
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken(Config::get('auth.token'))->plainTextToken;

        return response([
            'data' => [
                'message' => Lang::get('auth.success'),
                'user' => UserResource::make($user->loadMissing('roles')),
                'access_token' => $token
            ],
        ], Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response([
            'data' => [
                'message' => Lang::get('auth.logout')
            ],
        ], Response::HTTP_OK);
    }
}
