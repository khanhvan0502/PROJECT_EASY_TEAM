<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{

    public function index(){
        $news = News::all();
        return response()->json([
            'status'=>200,
            'news'=> $news
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:250',
            'slug' => 'required|max:250',
            'description' => 'required|max:250',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $news = new News;
            $news->name = $request->input('name');
            $news->slug = $request->input('slug');
            $news->description = $request->input('description');
            $news->status = $request->input('status') == true ? '1' : '0';
            $news->save();
            return response()->json([
                'status' => 200,
                'message' => 'Thêm danh mục thành công!',
            ]);
        }
    }
}
