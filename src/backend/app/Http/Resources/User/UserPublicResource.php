<?php

namespace App\Http\Resources\User;

use App\Http\Resources\NoteFilteredResource;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserPublicResource extends JsonResource
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
            'username' => $this->username,
            'notes' => NoteFilteredResource::collection($this->whenLoaded('notes')),
            'roles' => RoleResource::collection($this->whenLoaded('roles')),
        ];
    }
}
