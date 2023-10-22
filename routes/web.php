<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SlideController;
use App\Http\Controllers\StyleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AttributeController;
use App\Http\Controllers\AttributeValueController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TagController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('/users', UserController::class)
    ->only(['index', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('/orders', OrderController::class)
    ->only(['index', 'show', 'store', 'update'])
    ->middleware(['auth', 'verified']);


Route::resource('/slides', SlideController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('/categories', CategoryController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);
Route::post('/categories/check', [CategoryController::class, 'checkSlug'])
    ->middleware(['auth', 'verified']);

Route::resource('/styles', StyleController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);
Route::post('/styles/check', [StyleController::class, 'checkSlug'])
    ->middleware(['auth', 'verified']);

Route::resource('/attributes', AttributeController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('/attribute-values', AttributeValueController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('/tags', TagController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);


Route::get('/products/{id}/duplicate', [ProductController::class, 'duplicate'])
    ->middleware(['auth', 'verified'])->name('products.duplicate');
Route::get('/products/not-published', [ProductController::class, 'notPublished'])
    ->middleware(['auth', 'verified'])->name('products.notPublished');
Route::post('/products/check', [ProductController::class, 'checkSlug'])
    ->middleware(['auth', 'verified']);
Route::resource('/products', ProductController::class)
    ->middleware(['auth', 'verified']);

Route::resource('/images', ImageController::class)
    ->only(['index', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::post('/images/upload', [ImageController::class, 'upload'])
    ->middleware(['auth', 'verified']);




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
