<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->get();

        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // if (!$request->user()->isAdmin()) {
        //     return to_route('dashboard');
        // }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($id)],
            'role' => ['required']
        ]);

        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;

        $user->save();

        return to_route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        if (!$request->user()->isAdmin()) {
            return to_route('dashboard');
        }

        $user = User::find($id);
        $user->delete();

        return to_route('users.index');
    }
}
