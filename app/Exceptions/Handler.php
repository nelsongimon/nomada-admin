<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
        });

        $this->renderable(function (MethodNotAllowedHttpException $exception, Request $request) {
            if ($request->is('register') && $request->method() === 'GET') {
                return abort(404);
            }
        });

        // $this->renderable(function (ValidationException $exception, Request $request) {
        //     if ($exception->getResponse() && $exception->getResponse()->status() === 404) {
        //         return response()->view('errors.404', [], 404);
        //     }
        // });
    }
}
