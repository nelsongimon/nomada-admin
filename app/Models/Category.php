<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'categoryId');
    }

    // public function getBillboardAttribute($value)
    // {
    //     if (is_null($value)) {
    //         return null;
    //     }
    //     $url = env('APP_URL') . "/" . $value;
    //     return $url;
    // }
}
