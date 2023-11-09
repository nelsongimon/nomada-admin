<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiKeyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        // $apiKey = $request->header('X-API-Key');

        // if (!$apiKey) {
        //     return response()->json(['message' => 'Not authtorized'], 401);
        // }

        // $secretKey = env('API_SECRET_KEY');

        // if ($apiKey !== $secretKey) {
        //     return response()->json(['message' => 'Invalid API Key'], 400);
        // }

        return $next($request);
    }
}
