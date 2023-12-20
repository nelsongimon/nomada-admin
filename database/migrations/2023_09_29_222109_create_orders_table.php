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
    Schema::create('orders', function (Blueprint $table) {
      $table->uuid('id')->primary()->unique()->default(Uuid::uuid4());
      $table->string('orderCode')->unique();
      $table->string('status');
      $table->json('products')->nullable();
      $table->decimal('totalAmountVen', 10, 2);
      $table->decimal('totalAmountUsd', 10, 2);
      $table->string('customerName');
      $table->string('customerEmail');
      $table->string('customerPhoneNumber');
      $table->date('shippingDate')->nullable();
      $table->string('guideNumber')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('orders');
  }
};
