<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Style extends Model
{
    use HasFactory;

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'styleId');
    }

    // public function getBillboardAttribute($value)
    // {
    //     if (is_null($value)) {
    //         return null;
    //     }
    //     $url = env('APP_URL') . "/" . $value;
    //     return $url;
    // }

    // public function getImageAttribute($value)
    // {
    //     $url = env('APP_URL') . "/" . $value;
    //     return $url;
    // }
}
