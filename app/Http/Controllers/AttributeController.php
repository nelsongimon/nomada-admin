<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use Illuminate\Http\Request;
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

        return Inertia::render('Attributes/Index', [
            'attributes' =>  $attributes,
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
        $attribute->delete();

        return to_route('attributes.index');
    }
}
