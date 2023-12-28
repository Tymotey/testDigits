<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\User;
use App\Http\Requests\V1\StoreUserRequest;
use App\Http\Requests\V1\UpdateUserRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\UserResource;
use App\Http\Resources\V1\UserCollection;
use Illuminate\Http\Request;
use App\Filters\V1\UserFilter;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new UserFilter();
        $filterItems = $filter->transform($request); // [['column', 'operator', 'value']]

        $users = User::where($filterItems);

        // Add per page limit
        $perPage = $request->input('results', 999);
        if (!is_numeric($perPage)) {
            $perPage = 999;
        }

        // Order by column order
        $users->orderBy('name', 'asc');

        return new UserCollection($users->paginate($perPage)->appends($request->query()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // return $task;
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        if ($request->user()->hasRole('admin') || ($request->user()->hasRole('user') && $user->id === $request->user()->id)) {
            $data = $request->all();

            // Change password if both passwords are the same
            if (isset($data['password']) && isset($data['confirmPassword'])) {
                if ($data['password'] !== $data['confirmPassword']) {
                    unset($data['password']);
                }
                unset($data['confirmPassword']);
            } else {
                unset($data['password']);
                unset($data['confirmPassword']);
            }

            $user->update($data);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'You do not have access to this resource',
            ], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
