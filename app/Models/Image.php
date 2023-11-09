<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Image extends Model
{
    use HasFactory;

    // public function product(): BelongsTo
    // {
    //     return $this->belongsTo(Product::class, 'productUuid');
    // }

    // public function getImageAttribute($value)
    // {
    //     $imageUrl = env('APP_URL') . "/" . $value;
    //     return $imageUrl;
    // }
}
