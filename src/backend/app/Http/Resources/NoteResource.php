<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => UserResource::make($this->whenLoaded('user')),
            'content' => $this->content,
            'isPublic' => $this->is_public,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'deleted_at' => $this->when($this->resource->trashed(), fn () => $this->deleted_at),
            'topics' => TopicResource::collection($this->whenLoaded('topics')),
        ];
    }
}
