<?php

namespace App\Http\Controllers;

use App\Models\Style;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StyleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $styles = Style::withCount('products')->orderBy('order', 'asc')->get();

        return Inertia::render('Styles/Index', [
            'styles' =>  $styles
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'min:2'],
            'slug' => ['required', 'min:2'],
            'order' => ['required', 'integer'],
            'image' => ['required'],
        ]);

        $style = new Style();
        $style->name = $request->name;
        $style->slug = $request->slug;
        $style->order = $request->order;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $style->image = $image->storeAs('/images/categories', $fileName);
        }

        if ($request->hasFile('billboard')) {
            $image = $request->file('billboard');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $style->billboard = $image->storeAs('/images/categories', $fileName);
        }

        if ($request->filled('description')) {
            $style->description = $request->description;
        }

        $style->save();

        return to_route('styles.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $style = Style::find($id);

        if ($request->filled('name')) {
            $style->name = $request->name;
        }

        if ($request->filled('slug')) {
            $style->slug = $request->slug;
        }

        if ($request->filled('order')) {
            $style->order = $request->order;
        }

        if ($request->filled('description')) {
            $style->description = $request->description;
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $style->image = $image->storeAs('/images/styles', $fileName);
        }

        if ($request->hasFile('billboard')) {
            $image = $request->file('billboard');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $style->billboard = $image->storeAs('/images/styles', $fileName);
        } else {
            $style->billboard = null;
        }

        $style->save();

        return to_route('styles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $style = Style::find($id);
        DB::table('products')->where('styleId', $style->id)->update(['styleId' => null]);
        $style->delete();

        return to_route('styles.index');
    }

    /**
     * Check the slug in the request and return a JSON response indicating if it exists or not.
     */
    public function checkSlug(Request $request)
    {
        $slug = $request->slug;
        $style = Style::where('slug', $slug)->first();

        return response()->json([
            'slug' => $style ? false : true
        ]);
    }
}
