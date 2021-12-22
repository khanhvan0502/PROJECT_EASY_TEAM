<?php

namespace App\Models;

use App\Models\CategoryQuiz;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $table = 'items';
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'time',
        'image',
        'status',
    ];

    protected $with = ['category'];
    public function category()
    {
        return $this->belongsTo(CategoryQuiz::class, 'category_id', 'id');
    }
}
