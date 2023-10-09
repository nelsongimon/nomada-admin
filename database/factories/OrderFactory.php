<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class OrderFactory extends Factory
{
  protected $model = Order::class;

  public function definition()
  {
    return [
      'uuid' => Uuid::uuid4(),
      'order_code' => $this->faker->unique()->randomNumber(6),
      'status' => $this->faker->randomElement(['pending', 'processing', 'completed', 'cancelled']),
      'products' => json_encode([$this->faker->word(), $this->faker->word(), $this->faker->word()]),
      'total_amount_ven' => $this->faker->randomFloat(2, 0, 10000),
      'total_amount_usd' => $this->faker->randomFloat(2, 0, 10000),
      'customer_name' => $this->faker->name(),
      'customer_email' => $this->faker->unique()->safeEmail(),
      'customer_phone_number' => $this->faker->phoneNumber(),
      'payment_method' => $this->faker->randomElement(['credit_card', 'paypal', 'cash']),
      'shipping_method' => $this->faker->randomElement(['standard', 'express']),
      'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
      'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
    ];
  }
}
