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
            $table->uuid('uuid')->primary()->unique()->default(Uuid::uuid4());
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('model');
            $table->decimal('regularPrice', 10, 2);
            $table->decimal('promotionalPrice', 10, 2);
            $table->integer('quantity');
            $table->boolean('visibility');
            $table->string('detailsImage');
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
