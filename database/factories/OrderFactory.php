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
      'orderCode' => $this->faker->unique()->randomNumber(6),
      'status' => $this->faker->randomElement(['pending', 'processing', 'completed', 'cancelled']),
      'products' => json_encode([$this->faker->word(), $this->faker->word(), $this->faker->word()]),
      'totalAmountVen' => $this->faker->randomFloat(2, 0, 10000),
      'totalAmountUsd' => $this->faker->randomFloat(2, 0, 10000),
      'customerName' => $this->faker->name(),
      'customerEmail' => $this->faker->unique()->safeEmail(),
      'customerPhoneNumber' => $this->faker->phoneNumber(),
      'paymentMethod' => $this->faker->randomElement(['credit_card', 'paypal', 'cash']),
      'shippingMethod' => $this->faker->randomElement(['standard', 'express']),
      'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
      'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
    ];
  }
}
