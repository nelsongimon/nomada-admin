<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Product;
use App\Models\Slide;
use App\Models\Style;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    /**
     * Retrieves the featured products.
     *
     * @return \Illuminate\Http\JsonResponse The JSON response containing the featured products.
     */
    public function featuredProducts()
    {
        $products = Product::with(['category', 'style', 'images', 'tags', 'attributeValues'])
            ->where('visibility', 1)
            ->where('featured', 1)
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json([
            'products' => $products
        ]);
    }

    /**
     * Retrieves all styles from the database and returns them as a JSON response.
     *
     * @return \Illuminate\Http\JsonResponse JSON response containing the styles.
     */
    public function getStyles()
    {
        $styles = Style::orderBy('order', 'asc')->get();

        return response()->json([
            'styles' => $styles
        ]);
    }

    /**
     * Retrieves a style with its associated products.
     *
     * @param string $style The style slug.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the style and its products.
     */
    public function getStyleWithProducts(string $style)
    {
        $style = Style::with(['products' => function ($query) {
            $query->with(['category', 'images', 'tags']);
            $query->where('visibility', 1);
        }])->where('slug', $style)->first();

        return response()->json([
            'style' => $style
        ]);
    }

    /**
     * Retrieves the products from the database.
     *
     * @return \Illuminate\Http\JsonResponse The JSON response containing the products.
     */
    public function getProducts(Request $request)
    {
        if ($request->has('values')) {
            $values = explode(',', $request->input('values'));
            $products = Product::with(['category', 'images', 'tags', 'attributeValues'])
                ->whereHas('attributeValues', function ($query) use ($values) {
                    $query->whereIn('slug', $values);
                })
                ->where('visibility', 1)
                ->get();
        } else {
            $products = Product::with(['category', 'images', 'tags'])
                ->where('visibility', 1)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json([
            'products' => $products
        ]);
    }

    /**
     * Search for products based on a given search term.
     *
     * @param string $search The search term to filter products.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the search results.
     */
    public function search(string $search)
    {
        $products = Product::with(['category', 'images', 'tags'])
            ->where('visibility', 1)
            ->where('name', 'like', '%' . $search . '%')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'products' => $products
        ]);
    }

    /**
     * Retrieves an attribute with its associated values.
     *
     * @param string $attribute The slug of the attribute to retrieve.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the attribute and its values.
     */
    public function getAttributeWithValues(string $attribute)
    {
        $attribute = Attribute::with(['attributeValues' => function ($query) {
            $query->orderBy('order', 'asc');
        }])->where('name', 'like', '%' . $attribute . '%')->first();

        return response()->json([
            'attribute' => $attribute
        ]);
    }

    /**
     * Retrieves the slides from the database and returns them as a JSON response.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSlides()
    {
        $slides = Slide::orderBy('order', 'asc')->get();

        return response()->json([
            'slides' => $slides
        ]);
    }

    /**
     * Filter the products based on the given request.
     *
     * @param Request $request The request object containing the filter values.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the filtered attributes.
     */
    public function filter(Request $request)
    {
        if ($request->has('values')) {
            $values = explode(',', $request->input('values'));
            $attributes = Attribute::with(['attributeValues' => function ($query) {
                $query->withCount('products');
                $query->orderBy('order', 'asc');
            }])->orderBy('order', 'asc')->get();

            $filteredProducts = Product::with('attributeValues')->whereHas('attributeValues', function ($query) use ($values) {
                $query->whereIn('slug', $values);
            })
                ->where('visibility', 1)
                ->get();

            foreach ($attributes as $attribute) {
                foreach ($attribute->attributeValues as $value) {
                    $counter =  0;
                    foreach ($filteredProducts as $product) {
                        if ($product->attributeValues->contains('id', $value->id)) {
                            $counter =  $counter + 1;
                        }
                    }
                    $value->products_count = $counter;
                }
            }
        } else {
            $attributes = Attribute::with(['attributeValues' => function ($query) {
                $query->withCount('products');
                $query->orderBy('order', 'asc');
            }])->orderBy('order', 'asc')->get();
        }


        return response()->json([
            'attributes' => $attributes
        ]);
    }
}
