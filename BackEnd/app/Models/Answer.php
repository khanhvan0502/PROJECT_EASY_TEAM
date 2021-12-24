<?php

namespace App\Models;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;
    protected $table = 'answers';
    protected $fillable = [
        'user_id',
        'item_id',
        'quiz_choice',
    ];

    protected $with = ['items', 'users'];

    public function items()
    {
        return $this->belongsTo(Item::class, 'item_id', 'id');
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
