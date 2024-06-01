<?php

namespace App\Filters;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class UserFilter extends ApiFilter
{
    public function __construct(array $filters)
    {
        parent::__construct($filters);
    }

    public function apply(Request $request, Builder $query)
    {
        foreach ($this->safeParams as $param => $column) {
            if ($request->has($param)) {
                switch ($param) {
                    case 'id':
                        $query->where($column, $request->$param);
                        break;
                    case 'username':
                        $query->whereRaw('LOWER(' . $column . ') LIKE ?', ['%' . strtolower($request->$param) . '%']);
                        break;
                    case 'email':
                        $query->whereRaw('LOWER(' . $column . ') LIKE ?', ['%' . strtolower($request->$param) . '%']);
                        break;
                    default:
                        $query->where($column, $request->$param);
                        break;
                }
            }
        }

        return $query;
    }
}
