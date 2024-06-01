<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

abstract class ApiFilter
{
    protected $safeParams;

    public function __construct(array $filters)
    {
        $this->safeParams = $filters;
    }

    abstract public function apply(Request $request, Builder $query);
}
