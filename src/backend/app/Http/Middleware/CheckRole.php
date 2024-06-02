<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (!$request->user() || !$request->user()->hasRole($role)) {
            return response(['data' => [
                'message' => Lang::get('auth.unauthorized'),
                'hasRoleRequire' => $request->user()->hasRole($role) ? 'true' : 'false'
            ]], Response::HTTP_UNAUTHORIZED);
        }
        return $next($request);
    }
}
