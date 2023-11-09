<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('api.key')->group(function () {
  Route::get('/products/{slug}', [ApiController::class, 'getProduct']);
  Route::get('/search/{search}', [ApiController::class, 'search']);
  Route::get('/featured-products/{limit?}', [ApiController::class, 'featuredProducts']);
  Route::get('/new-products/{limit?}', [ApiController::class, 'NewProducts']);
  Route::get('/products', [ApiController::class, 'getProducts']);
  Route::get('/styles', [ApiController::class, 'getStyles']);
  Route::get('/categories', [ApiController::class, 'getCategories']);
  Route::get('/styles/{style}', [ApiController::class, 'getStyleWithProducts']);
  Route::get('/attributes/{attribute}', [ApiController::class, 'getAttributeWithValues']);
  Route::get('/slides', [ApiController::class, 'getSlides']);
  Route::get('/filter', [ApiController::class, 'filter']);
  Route::get('/styles/{style}/filter', [ApiController::class, 'filterWithStyle']);
  Route::get('/search/{search}/filter', [ApiController::class, 'filterWithSearch']);
});
