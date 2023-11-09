<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Order;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Nelson Gimón',
            'email' => 'nelson.gimon@gmail.com',
            'password' => Hash::make('n3ls0ng1m0n.31'),
        ]);

        // Order::factory()->count(30)->create();
    }
}
