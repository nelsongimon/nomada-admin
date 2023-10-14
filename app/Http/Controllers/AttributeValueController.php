<?php

namespace App\Http\Controllers;

use App\Models\AttributeValue;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttributeValueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $values = AttributeValue::orderBy('order', 'asc')->get();

        return Inertia::render('Attributes/Index', [
            'values' =>  $values
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
            'attributeId' => ['required']
        ]);

        $value = new AttributeValue();
        $value->name = $request->name;
        $value->slug = $request->slug;
        $value->order = $request->order;
        $value->attributeId = $request->attributeId;

        if ($request->filled('value')) {
            $value->value = $request->value;
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $value->image = $image->storeAs('/images/attributes', $fileName);
        }

        $value->save();

        return to_route('attributes.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $value = AttributeValue::find($id);

        if ($request->filled('name')) {
            $value->name = $request->name;
        }

        if ($request->filled('slug')) {
            $value->slug = $request->slug;
        }

        if ($request->filled('order')) {
            $value->order = $request->order;
        }

        if ($request->filled('value')) {
            $value->value = $request->value;
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $value->image = $image->storeAs('/images/attributes', $fileName);
        } else {
            $value->image = null;
        }

        $value->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $value = AttributeValue::find($id);
        $value->delete();

        return to_route('attributes.index');
    }
}
