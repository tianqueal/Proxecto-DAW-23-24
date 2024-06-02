<?php

namespace App\Models;

use App\Http\Resources\NoteFilteredResource;
use App\Http\Resources\TopicCollection;
use App\Http\Resources\TopicResource;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Note extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'user_id',
        'content',
        'is_public'
    ];

    /**
     * Get the user that owns the Note
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The topics that belong to the Note
     *
     * @return BelongsToMany
     */
    public function topics(): BelongsToMany
    {
        return $this->belongsToMany(Topic::class);
    }

    public function isPublic(): bool
    {
        return $this->is_public;
    }

    public function isPrivate(): bool
    {
        return !$this->isPublic();
    }

    /* public function togglePublic(): void
    {
        $this->is_public = !$this->is_public;
        $this->save();
    } */

    public function publish(): void
    {
        $this->is_public = 1;
        $this->save();
    }

    public function unpublish(): void
    {
        $this->is_public = 0;
        $this->save();
    }

    public static function publicNotes()
    {
        return Note::where('is_public', true);
    }
}
