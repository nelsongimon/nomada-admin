<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $uuid)
    {
        $order = Order::where('uuid', $uuid)->first();
        return Inertia::render('Orders/Show', [
            'order' => $order
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $uuid)
    {
        $order = Order::where('uuid', $uuid)->first();
        $order->status = $request->status;
        $order->guide_number = $request->guide_number;
        $order->shipping_date = Carbon::parse($request->shipping_date)->format('Y-m-d H:i:s');
        $order->save();

        return to_route('orders.show', $order->uuid);
    }
}
