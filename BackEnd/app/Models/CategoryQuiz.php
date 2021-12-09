<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoryQuiz extends Model
{
    use SoftDeletes;

    public $table = 'categories';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'name',
        'slug',
        'description',
        'status',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function categoryQuestions()
    {
        return $this->hasMany(Question::class, 'category_id', 'id');
    }
    // use HasFactory;
    // protected $table = 'categories';
    // protected $fillable = [
    //     'name',
    //     'slug',
    //     'description',
    //     'status',
    // ];
}
