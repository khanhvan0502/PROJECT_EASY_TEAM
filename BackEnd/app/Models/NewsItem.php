<?php

namespace App\Models;

use App\Models\News;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsItem extends Model
{
    use HasFactory;
    protected $table = 'newsitem';
    protected $fillable = [
        'news_id',
        'name',
        'slug',
        'description',
        'time',
        'image',
        'status',
    ];
    protected $with = ['news'];

    public function news()
    {
        return $this->belongsTo(News::class, 'news_id', 'id');
    }
}
