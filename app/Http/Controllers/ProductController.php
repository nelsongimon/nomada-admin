<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Style;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['category', 'style', 'images'])
            ->where('visibility', 1)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $attributes = Attribute::with(['attributeValues' => function ($query) {
            $query->withCount('products');
            $query->orderBy('order', 'asc');
        }])->orderBy('order', 'asc')->get();
        $categories = Category::orderBy('order', 'asc')->get();
        $styles = Style::orderBy('order', 'asc')->get();
        $tags = Tag::all();

        return Inertia::render('Products/Create', [
            'categories' => $categories,
            'attributes' => $attributes,
            'styles' => $styles,
            'tags' => $tags
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
            'salePrice' => ['required'],
            'quantity' => ['required'],
            'visibility' => ['required'],
            'featured' => ['required'],
        ]);

        $product = new Product();
        $product->id = Uuid::uuid4();
        $product->name = $request->name;
        $product->slug = $request->slug;
        $product->quantity = $request->quantity;
        $product->visibility = $request->visibility;
        $product->featured = $request->featured;
        $product->salePrice = $request->salePrice;

        if ($request->filled('model')) {
            $product->model = $request->model;
        }
        if ($request->filled('promotionalPrice')) {
            $product->promotionalPrice = $request->promotionalPrice;
        }
        if ($request->filled('categoryId')) {
            $product->categoryId = $request->categoryId;
        }
        if ($request->filled('styleId')) {
            $product->styleId = $request->styleId;
        }

        if ($request->hasFile('specificationImage')) {
            $image = $request->file('specificationImage');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $product->specificationImage = $image->storeAs('/images/products', $fileName);
        }

        $product->save();

        $product->attributeValues()->attach($request->input('attributes'));
        $product->tags()->attach($request->input('tags'));
        $product->images()->attach($request->input('images'));

        return to_route('products.create');
    }

    /**
     * Display the specified resource.
     */
    public function duplicate(string $id)
    {
        $product = Product::with(['category', 'style', 'images', 'attributeValues', 'tags'])->find($id);
        $product->name = $product->name . ' (copy)';
        $product->slug = $product->slug . '-copy';

        $attributes = Attribute::with(['attributeValues' => function ($query) {
            $query->withCount('products');
            $query->orderBy('order', 'asc');
        }])->orderBy('order', 'asc')->get();
        $categories = Category::orderBy('order', 'asc')->get();
        $styles = Style::orderBy('order', 'asc')->get();
        $tags = Tag::all();

        return Inertia::render('Products/Duplicate', [
            'product' => $product,
            'categories' => $categories,
            'attributes' => $attributes,
            'styles' => $styles,
            'tags' => $tags
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::with(['category', 'style', 'images', 'attributeValues', 'tags'])->find($id);

        $attributes = Attribute::with(['attributeValues' => function ($query) {
            $query->withCount('products');
            $query->orderBy('order', 'asc');
        }])->orderBy('order', 'asc')->get();
        $categories = Category::orderBy('order', 'asc')->get();
        $styles = Style::orderBy('order', 'asc')->get();
        $tags = Tag::all();

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'attributes' => $attributes,
            'styles' => $styles,
            'tags' => $tags
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => ['required', 'min:2'],
            'slug' => ['required', 'min:2'],
            'salePrice' => ['required'],
            'quantity' => ['required'],
            'visibility' => ['required'],
            'featured' => ['required'],
        ]);

        $product = Product::find($id);
        $product->name = $request->name;
        $product->slug = $request->slug;
        $product->quantity = $request->quantity;
        $product->visibility = $request->visibility;
        $product->featured = $request->featured;
        $product->salePrice = $request->salePrice;

        if ($request->filled('model')) {
            $product->model = $request->model;
        }
        if ($request->filled('promotionalPrice')) {
            $product->promotionalPrice = $request->promotionalPrice;
        }
        if ($request->filled('categoryId')) {
            $product->categoryId = $request->categoryId;
        }
        if ($request->filled('styleId')) {
            $product->styleId = $request->styleId;
        }

        if ($request->hasFile('specificationImage')) {
            $image = $request->file('specificationImage');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $product->specificationImage = $image->storeAs('/images/products', $fileName);
        }


        $product->attributeValues()->detach();
        $product->attributeValues()->attach($request->input('attributes'));

        $product->tags()->detach();
        $product->tags()->attach($request->input('tags'));

        $product->images()->detach();
        $product->images()->attach($request->input('images'));

        $product->save();

        return to_route('products.edit', $product->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        DB::table('attribute_value_product')->where('product_id', $product->id)->delete();
        DB::table('image_product')->where('product_id', $product->id)->delete();
        DB::table('product_tag')->where('product_id', $product->id)->delete();
        $product->delete();

        return to_route('products.notPublished');
    }

    public function notPublished()
    {
        $products = Product::with(['images'])->where('visibility', 0)->get();

        return Inertia::render('Products/NotPublished', [
            'products' => $products
        ]);
    }

    /**
     * Check the slug in the request and return a JSON response indicating if it exists or not.
     */
    public function checkSlug(Request $request)
    {
        $slug = $request->slug;
        $product = Product::where('slug', $slug)->first();

        return response()->json([
            'slug' => $product ? false : true
        ]);
    }
}
