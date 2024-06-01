<?php

namespace App\Filters;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Lang;

class TopicFilter extends ApiFilter
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
                    case 'name':
                        $searchValue = strtolower($request->$param);

                        $translations = Lang::get('topics.names');

                        $matchingKeys = [];
                        foreach ($translations as $key => $value) {
                            if (strpos(strtolower($value), $searchValue) !== false) {
                                $matchingKeys[] = $key;
                            }
                        }

                        if (!empty($matchingKeys)) {
                            $query->whereIn($column, $matchingKeys);
                        } else {
                            $query->whereRaw(
                                'LOWER(' . $column . ') LIKE ?',
                                ['%' . $searchValue . '%']
                            );
                        }
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
