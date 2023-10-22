<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::withCount('products')->orderBy('order', 'asc')->get();

        return Inertia::render('Categories/Index', [
            'categories' =>  $categories
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
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->slug = $request->slug;
        $category->order = $request->order;

        if ($request->hasFile('billboard')) {
            $image = $request->file('billboard');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $category->billboard = $image->storeAs('/images/categories', $fileName);
        }

        if ($request->filled('description')) {
            $category->description = $request->description;
        }

        $category->save();

        return to_route('categories.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Category::find($id);

        if ($request->filled('name')) {
            $category->name = $request->name;
        }

        if ($request->filled('slug')) {
            $category->slug = $request->slug;
        }

        if ($request->filled('order')) {
            $category->order = $request->order;
        }

        if ($request->filled('description')) {
            $category->description = $request->description;
        }

        if ($request->hasFile('billboard')) {
            $image = $request->file('billboard');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $category->billboard = $image->storeAs('/images/categories', $fileName);
        } else {
            $category->billboard = null;
        }

        $category->save();

        return to_route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);
        DB::table('products')->where('categoryId', $category->id)->update(['categoryId' => null]);
        $category->delete();

        return to_route('categories.index');
    }

    /**
     * Checks if the given slug exists in the database and returns a JSON response.
     */
    public function checkSlug(Request $request)
    {
        $slug = $request->slug;
        $category = Category::where('slug', $slug)->first();

        return response()->json([
            'slug' => $category ? false : true
        ]);
    }
}
