<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $table = 'questions';
    protected $fillable = [
        'title',
        'category_question_id',
        'content',
        'tag_id',
    ];

    // protected $casts = [
    //     'created_at' => 'datetime:d/m/Y',
    //     'updated_at' => 'datetime:d/m/Y',
    // ];

    protected $with = ['user','category_question','tags'];
    public $timestamps = true;

    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function category_question(){
        return $this->belongsTo(CategoryQuestion::class, 'category_question_id');
    }
    
    public function tags()
    {
        return $this->belongsTo(Tag::class, 'tag_id');
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
