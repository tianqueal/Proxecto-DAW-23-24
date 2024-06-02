<?php

namespace App\Http\Resources;

use App\Http\Resources\User\UserPublicResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NoteFilteredResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $content = json_decode($this->content);
        $blocks = NoteContentResource::make($content->blocks);

        return [
            'id' => $this->id,
            'user' => UserPublicResource::make($this->whenLoaded('user')),
            'content' => json_encode([
                'time' => $content->time,
                'blocks' => $blocks,
                'version' => $content->version,
            ]),
            'isPublic' => $this->is_public,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'topics' => TopicResource::collection($this->whenLoaded('topics')),
        ];
    }
}
