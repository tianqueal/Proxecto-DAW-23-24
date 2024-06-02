<?php

namespace App\Http\Controllers;

use App\Filters\UserFilter;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Lang;
use Symfony\Component\HttpFoundation\Response;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userFilters = Config::get('query_filters.user');
        $filter = new UserFilter($userFilters->filters);

        $query = User::orderBy($userFilters->sorting, $userFilters->order)->with('roles');

        $users = $filter->apply($request, $query);

        $users = $users->paginate($userFilters->perPage);

        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $validatedData = $request->safe()->only([
            'username',
            'email',
            'password'
        ]);
        $validatedRoles = $request->safe()->only('roles');
        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        if (empty($validatedRoles)) {
            // Assign default role by default name
            $user->assignRole(Config::get('default_roles.default_user'));
        } else {
            // Assing roles by identifiers
            $user->assignRoles($validatedRoles);
        }

        event(new Registered($user));

        return UserResource::make($user->loadMissing('roles'));
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return UserResource::make($user->loadMissing('roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->safe()->only([
            'username',
            'email',
            'password'
        ]));
        return UserResource::make($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response(['data' => [
            'message' => Lang::get('administrator.delete.success')
        ]], Response::HTTP_ACCEPTED);
    }
}
