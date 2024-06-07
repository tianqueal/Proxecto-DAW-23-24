<?php

namespace App\Filters;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class NoteFilter extends ApiFilter
{
    // queryFilters.note.filters DEFAULTS:
    // [
    //     'userId' => 'user_id',
    //     'topicId' => 'topic_id',
    //     'content' => 'content'
    // ]
    public function __construct(array $filters)
    {
        parent::__construct($filters);
    }

    public function apply(Request $request, Builder $query)
    {
        foreach ($this->safeParams as $param => $column) {
            if ($request->has($param)) {
                switch ($param) {
                    case 'topicId':
                        $topicIds = is_array($request->$param) ? $request->$param : [$request->$param];
                        $query->whereHas('topics', function ($q) use ($topicIds) {
                            $q->whereIn('id', $topicIds);
                        });
                        break;
                    case 'content':
                        $query->whereRaw('LOWER(' . $column . ') LIKE ?', ['%' . strtolower($request->$param) . '%']);
                        break;
                    case 'username':
                        $query->whereHas('user', function ($q) use ($request, $param) {
                            $q->where('username', '=', $request->$param);
                        });
                        break;
                        // Here we can add more cases for different types of filters
                    default:
                        $query->where($column, $request->$param);
                        break;
                }
            }
        }

        return $query;
    }
}
