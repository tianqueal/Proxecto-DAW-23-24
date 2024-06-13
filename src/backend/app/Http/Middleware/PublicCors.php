<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PublicCors
{
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request)
            ->header("Access-Control-Allow-Origin", '*')
            ->header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
            ->header("Access-Control-Allow-Headers", 'Accept, Accept-Language, Content-Type, Authorization, X-Requested-With, X-Token-Auth, Origin, Authorization');
    }
}
