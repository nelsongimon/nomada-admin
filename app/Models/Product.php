<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $primaryKey = 'uuid';

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class, 'productUuid');
    }

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
        return $this->belongsToMany(Tag::class, 'products_tags', 'productUuid', 'tagId');
    }

    public function atrributeValues(): BelongsToMany
    {
        return $this->belongsToMany(AttributeValue::class, 'products_attributes_values', 'productUuid', 'attributeValueId');
    }
}
