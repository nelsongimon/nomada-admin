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
      $table->uuid('uuid')->primary()->unique()->default(Uuid::uuid4());
      $table->string('order_code')->unique();

      $table->string('status');

      $table->json('products');
      $table->decimal('total_amount_ven', 10, 2);
      $table->decimal('total_amount_usd', 10, 2);

      $table->string('customer_name');
      $table->string('customer_email');
      $table->string('customer_phone_number');

      $table->string('payment_method');

      $table->string('shipping_method');

      $table->date('shipping_date')->nullable();
      $table->string('guide_number')->nullable();
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
