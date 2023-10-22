<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $image = Image::find($id);
        DB::table('product_tag')->where('product_id', $image->id)->delete();
        $image->delete();
    }

    public function upload(Request $request)
    {
        $file = new Image();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $originalName = $image->getClientOriginalName();
            $fileName = Carbon::now()->format('YmdHis') . '_' . $originalName;
            $file->image = $image->storeAs('/images/products', $fileName);
        }

        $file->save();

        return response()->json([
            'image' => $file
        ]);
    }
}
