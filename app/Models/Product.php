<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
    use HasFactory;

    public $incrementing = false;
    public static $snakeAttributes = false;

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'categoryId');
    }

    public function style(): BelongsTo
    {
        return $this->belongsTo(Style::class, 'styleId');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function attributeValues(): BelongsToMany
    {
        return $this->belongsToMany(AttributeValue::class);
    }

    public function images(): BelongsToMany
    {
        return $this->belongsToMany(Image::class);
    }

    // public function getSpecificationImageAttribute($value)
    // {
    //     if (is_null($value)) {
    //         return null;
    //     }
    //     $url = env('APP_URL') . "/" . $value;
    //     return $url;
    // }
}
