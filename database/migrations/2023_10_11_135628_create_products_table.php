<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Ramsey\Uuid\Uuid;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique()->default(Uuid::uuid4());
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('model')->nullable();
            $table->decimal('salePrice', 10, 2);
            $table->decimal('promotionalPrice', 10, 2)->nullable();
            $table->integer('quantity');
            $table->boolean('visibility');
            $table->boolean('featured');
            $table->string('specificationImage')->nullable();
            $table->foreignId('styleId')->nullable()->references('id')->on('styles');
            $table->foreignId('categoryId')->nullable()->references('id')->on('categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
