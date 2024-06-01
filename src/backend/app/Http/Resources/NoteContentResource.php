<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Config;

class NoteContentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $listableBlocks = Config::get('editorjs.listable_blocks');
        $listableTextBlocks = Config::get('editorjs.listable_text_blocks');
        $maxListableBlocks = Config::get('editorjs.max_listable_blocks');
        $maxListableTextLength = Config::get('editorjs.max_listable_text_length');

        $filterBlocks = fn ($block) => in_array($block->type, $listableBlocks);

        $blocks = array_filter($this->resource, $filterBlocks);
        $blocks = array_slice($blocks, 0, $maxListableBlocks);

        $blocks = array_map(
            function ($block) use ($listableTextBlocks, $maxListableTextLength) {
                $data = $block->data;

                if (
                    in_array($block->type, $listableTextBlocks) &&
                    strlen($data->text) > $maxListableTextLength
                ) {
                    $data->text = substr($data->text, 0, $maxListableTextLength) . '...';
                }

                return [
                    'id' => $block->id,
                    'type' => $block->type,
                    'data' => $data,
                ];
            },
            $blocks
        );

        return $blocks;
    }
}
