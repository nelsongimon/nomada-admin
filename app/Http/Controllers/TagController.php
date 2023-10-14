<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::all();

        return Inertia::render('Attributes/Index', [
            'tags' =>  $tags
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'min:2'],
        ]);

        $tag = new Tag();
        $tag->name = $request->name;
        $tag->save();

        return to_route('attributes.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tag = Tag::find($id);

        $request->validate([
            'name' => ['required', 'min:2'],
        ]);

        $tag->name = $request->name;
        $tag->save();

        return to_route('attributes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tag = Tag::find($id);
        $tag->delete();

        return to_route('attributes.index');
    }
}
