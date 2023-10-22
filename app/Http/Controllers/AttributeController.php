<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $attributes = Attribute::with(['attributeValues' => function ($query) {
            $query->withCount('products');
            $query->orderBy('order', 'asc');
        }])->orderBy('order', 'asc')->get();

        $tags = Tag::all();

        return Inertia::render('Attributes/Index', [
            'attributes' =>  $attributes,
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'min:2'],
            'order' => ['required', 'integer'],
        ]);

        $attribute = new Attribute();
        $attribute->name = $request->name;
        $attribute->order = $request->order;
        $attribute->save();

        return to_route('attributes.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $attribute = Attribute::find($id);

        if ($request->filled('name')) {
            $attribute->name = $request->name;
        }

        if ($request->filled('order')) {
            $attribute->order = $request->order;
        }

        $attribute->save();

        return to_route('attributes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $attribute = Attribute::find($id);

        foreach ($attribute->attributeValues as $value) {
            DB::table('attribute_value_product')->where('attribute_value_id', $value->id)->delete();
        }

        $attribute->delete();

        return to_route('attributes.index');
    }
}
