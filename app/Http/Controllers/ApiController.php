<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Category;
use App\Models\Product;
use App\Models\Slide;
use App\Models\Style;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    /**
     * Retrieves a product and its related products from the database.
     *
     * @param string $slug The slug of the product to retrieve.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the product and related products.
     */
    public function getProduct($slug)
    {
        $product = Product::with(['category', 'style', 'images', 'tags', 'attributeValues' => function ($query) {
            $query->with('attribute');
            $query->orderBy('order', 'desc');
        }])->where('slug', $slug)->first();

        $relatedProducts = Product::with(['category', 'style', 'images', 'tags'])
            ->where('visibility', 1)
            ->where('categoryId', $product->category->id)
            ->orderBy('updated_at', 'desc')
            ->limit(8)
            ->get();

        return response()->json([
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
    /**
     * Retrieves the featured products.
     *
     * @return \Illuminate\Http\JsonResponse The JSON response containing the featured products.
     */
    public function featuredProducts($limit = false)
    {
        if ($limit) {
            $products = Product::with(['category', 'style', 'images', 'tags'])
                ->where('visibility', 1)
                ->where('featured', 1)
                ->orderBy('updated_at', 'desc')
                ->limit($limit)
                ->get();
        } else {
            $products = Product::with(['category', 'style', 'images', 'tags'])
                ->where('visibility', 1)
                ->where('featured', 1)
                ->orderBy('updated_at', 'desc')
                ->get();
        }

        return response()->json([
            'products' => $products
        ]);
    }

    public function NewProducts($limit = false)
    {
        if ($limit) {
            $products = Product::with(['category', 'style', 'images', 'tags'])
                ->where('visibility', 1)
                ->where('isNew', 1)
                ->orderBy('updated_at', 'desc')
                ->limit($limit)
                ->get();
        } else {
            $products = Product::with(['category', 'style', 'images', 'tags'])
                ->where('visibility', 1)
                ->where('isNew', 1)
                ->orderBy('updated_at', 'desc')
                ->get();
        }

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
     * Retrieves the categories from the database and returns them as a JSON response.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCategories()
    {
        $categories = Category::orderBy('order', 'asc')->get();

        return response()->json([
            'categories' => $categories
        ]);
    }

    /**
     * Retrieves the products from the database.
     *
     * @return \Illuminate\Http\JsonResponse The JSON response containing the products.
     */
    public function getProducts(Request $request)
    {
        if ($request->has('filter')) {
            $attributeKeys = explode('_', $request->input('filter'));
            $products = Product::with(['category', 'style', 'images', 'tags'])
                ->where(function ($query) use ($attributeKeys) {
                    foreach ($attributeKeys as $attribute) {
                        $values = explode(',', $attribute);
                        $query->whereHas('attributeValues', function ($subquery) use ($values) {
                            $subquery->whereIn('slug', $values);
                        });
                    }
                })
                ->where('visibility', 1)
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $products = Product::with(['category', 'style', 'images', 'tags'])
                ->where('visibility', 1)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json([
            'products' => $products
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
            $attributeKeys = explode('_', $request->input('values'));
            $filteredProducts = Product::with('attributeValues')
                ->where(function ($query) use ($attributeKeys) {
                    foreach ($attributeKeys as $attribute) {
                        $values = explode(',', $attribute);
                        $query->whereHas('attributeValues', function ($subquery) use ($values) {
                            $subquery->whereIn('slug', $values);
                        });
                    }
                })
                ->where('visibility', 1)
                ->get();

            $attributes = Attribute::with(['attributeValues' => function ($query) {
                $query->withCount(['products' => function ($query) {
                    $query->where('visibility', 1);
                }]);
                $query->orderBy('order', 'asc');
            }])->orderBy('order', 'asc')->get();

            foreach ($attributes as $attribute) {
                $canUpdateCount = true;
                foreach ($attributeKeys as $key) {
                    $values = explode(',', $key);
                    $intersection = array_intersect($values, $attribute->attributeValues->pluck('slug')->toArray());
                    if (!empty($intersection)) {
                        $canUpdateCount = false;
                    }
                }
                foreach ($attribute->attributeValues as $value) {
                    $counter =  0;
                    $canUpdateCountValue = false;
                    $hasSelectedValue = in_array($value->slug, $values);
                    foreach ($filteredProducts as $product) {
                        if ($product->attributeValues->contains('id', $value->id)) {
                            $canUpdateCountValue = true;
                            $counter =  $counter + 1;
                        }
                    }
                    if ($canUpdateCount || $canUpdateCountValue || $hasSelectedValue) {
                        $value->products_count = $counter;
                    }
                }
            }
        } else {
            $attributes = Attribute::with(['attributeValues' => function ($query) {
                $query->withCount(['products' => function ($query) {
                    $query->where('visibility', 1);
                }]);
                $query->orderBy('order', 'asc');
            }])->orderBy('order', 'asc')->get();
        }


        return response()->json([
            'attributes' => $attributes
        ]);
    }

    /**
     * Retrieves a style with its associated products.
     *
     * @param string $style The style slug.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the style and its products.
     */
    public function getStyleWithProducts(Request $request, string $style)
    {
        if ($request->has('filter')) {
            $attributeKeys = explode('_', $request->input('filter'));
            $style = Style::with(['products' => function ($query) use ($attributeKeys) {
                $query->with(['category', 'style', 'images', 'tags'])
                    ->where(function ($query) use ($attributeKeys) {
                        foreach ($attributeKeys as $attribute) {
                            $values = explode(',', $attribute);
                            $query->whereHas('attributeValues', function ($subquery) use ($values) {
                                $subquery->whereIn('slug', $values);
                            });
                        }
                    })
                    ->where('visibility', 1)
                    ->orderBy('created_at', 'desc');
            }])->where('slug', $style)->first();
        } else {
            $style = Style::with(['products' => function ($query) {
                $query->with(['category', 'style', 'images', 'tags'])
                    ->where('visibility', 1)
                    ->orderBy('created_at', 'desc');
            }])->where('slug', $style)->first();
        }

        return response()->json([
            'style' => $style
        ]);
    }

    /**
     * Filters the data based on the given style and request values.
     *
     * @param Request $request The request object.
     * @param string $style The style to filter the data with.
     * @return \Illuminate\Http\JsonResponse The filtered data in JSON format.
     */
    public function filterWithStyle(Request $request, $style)
    {
        if ($request->has('values')) {
            $attributeKeys = explode('_', $request->input('values'));

            $attributes = Attribute::with(['attributeValues' => function ($query) use ($style) {
                $query->withCount(['products' => function ($query) use ($style) {
                    $query->whereHas('style', function ($query) use ($style) {
                        $query->where('slug', $style);
                    });
                    $query->where('visibility', 1);
                }]);
                $query->orderBy('order', 'asc');
            }])->orderBy('order', 'asc')->get();

            $filteredProducts = Product::with('attributeValues')
                ->whereHas('style', function ($query) use ($style) {
                    $query->where('slug', $style);
                })
                ->where(function ($query) use ($attributeKeys) {
                    foreach ($attributeKeys as $attribute) {
                        $values = explode(',', $attribute);
                        $query->whereHas('attributeValues', function ($subquery) use ($values) {
                            $subquery->whereIn('slug', $values);
                        });
                    }
                })
                ->where('visibility', 1)
                ->get();


            foreach ($attributes as $attribute) {
                $canUpdateCount = true;
                foreach ($attributeKeys as $key) {
                    $values = explode(',', $key);
                    $intersection = array_intersect($values, $attribute->attributeValues->pluck('slug')->toArray());
                    if (!empty($intersection)) {
                        $canUpdateCount = false;
                    }
                }
                foreach ($attribute->attributeValues as $value) {
                    $counter =  0;
                    $canUpdateCountValue = false;
                    $hasSelectedValue = in_array($value->slug, $values);
                    foreach ($filteredProducts as $product) {
                        if ($product->attributeValues->contains('id', $value->id)) {
                            $canUpdateCountValue = true;
                            $counter =  $counter + 1;
                        }
                    }
                    if ($canUpdateCount || $canUpdateCountValue || $hasSelectedValue) {
                        $value->products_count = $counter;
                    }
                }
            }
        } else {
            $attributes = Attribute::with(['attributeValues' => function ($query) use ($style) {
                $query->withCount(['products' => function ($query) use ($style) {
                    $query->whereHas('style', function ($query) use ($style) {
                        $query->where('slug', $style);
                    })->where('visibility', 1);
                }]);
                $query->orderBy('order', 'asc');
            }])->orderBy('order', 'asc')->get();
        }

        return response()->json([
            'attributes' => $attributes
        ]);
    }

    /**
     * Search for products based on a given search term.
     *
     * @param string $search The search term to filter products.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the search results.
     */
    public function search(Request $request, string $search)
    {
        if ($request->has('filter')) {
            $attributeKeys = explode('_', $request->input('filter'));
            $products = Product::with(['category', 'style', 'images', 'tags'])
                ->where('name', 'like', '%' . $search . '%')
                // ->orWhereHas('style', function ($query) use ($search) {
                //     $query->where('slug', 'like', '%' . $search . '%');
                // })
                // ->orWhereHas('attributeValues', function ($query) use ($search) {
                //     $query->where('name', 'like', '%' . $search . '%');
                // })
                // ->orWhereHas('category', function ($query) use ($search) {
                //     $query->where('name', 'like', '%' . $search . '%');
                // })
                ->where(function ($query) use ($attributeKeys) {
                    foreach ($attributeKeys as $attribute) {
                        $values = explode(',', $attribute);
                        $query->whereHas('attributeValues', function ($subquery) use ($values) {
                            $subquery->whereIn('slug', $values);
                        });
                    }
                })
                ->where('visibility', 1)
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $products = Product::with(['category', 'style', 'images', 'tags'])
                ->whereHas('category', function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                })
                ->orWhereHas('style', function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                })
                ->orWhereHas('attributeValues', function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                })
                ->orWhere('name', 'like', '%' . $search . '%')
                ->where('visibility', 1)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json([
            'products' => $products
        ]);
    }

    public function filterWithSearch(Request $request, $search)
    {
        if ($request->has('values')) {
            $attributeKeys = explode('_', $request->input('values'));

            $attributes = Attribute::with(['attributeValues' => function ($query) use ($search) {
                $query->withCount(['products' => function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                    $query->where('visibility', 1);
                }]);
                $query->orderBy('order', 'asc');
            }])->orderBy('order', 'asc')->get();

            $filteredProducts = Product::with('attributeValues')
                ->whereHas('category', function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                })
                ->orWhereHas('style', function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                })
                ->orWhereHas('attributeValues', function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                })
                ->orWhere('name', 'like', '%' . $search . '%')
                ->where(function ($query) use ($attributeKeys) {
                    foreach ($attributeKeys as $attribute) {
                        $values = explode(',', $attribute);
                        $query->whereHas('attributeValues', function ($subquery) use ($values) {
                            $subquery->whereIn('slug', $values);
                        });
                    }
                })
                ->where('visibility', 1)
                ->get();

            foreach ($attributes as $attribute) {
                $canUpdateCount = true;
                foreach ($attributeKeys as $key) {
                    $values = explode(',', $key);
                    $intersection = array_intersect($values, $attribute->attributeValues->pluck('slug')->toArray());
                    if (!empty($intersection)) {
                        $canUpdateCount = false;
                    }
                }
                foreach ($attribute->attributeValues as $value) {
                    $counter =  0;
                    $canUpdateCountValue = false;
                    $hasSelectedValue = in_array($value->slug, $values);
                    foreach ($filteredProducts as $product) {
                        if ($product->attributeValues->contains('id', $value->id)) {
                            $canUpdateCountValue = true;
                            $counter =  $counter + 1;
                        }
                    }
                    if ($canUpdateCount || $canUpdateCountValue || $hasSelectedValue) {
                        $value->products_count = $counter;
                    }
                }
            }
        } else {
            $attributes = Attribute::with(['attributeValues' => function ($query) use ($search) {
                $query->withCount(['products' => function ($query) use ($search) {
                    $query->whereHas('category', function ($query) use ($search) {
                        $query->where('name', 'like', '%' . $search . '%');
                    })
                        ->orWhereHas('style', function ($query) use ($search) {
                            $query->where('name', 'like', '%' . $search . '%');
                        })
                        ->orWhereHas('attributeValues', function ($query) use ($search) {
                            $query->where('name', 'like', '%' . $search . '%');
                        })
                        ->orWhere('name', 'like', '%' . $search . '%')
                        ->where('visibility', 1);
                }]);
                $query->orderBy('order', 'asc');
            }])->orderBy('order', 'asc')->get();
        }

        return response()->json([
            'attributes' => $attributes
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
        $slides = Slide::orderBy('order', 'asc')->where('active', 1)->get();

        return response()->json([
            'slides' => $slides
        ]);
    }
}
