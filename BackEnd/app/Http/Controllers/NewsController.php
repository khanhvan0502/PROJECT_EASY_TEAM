<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{

    public function index()
    {
        $news = News::all();
        return response()->json([
            'status' => 200,
            'news' => $news,
        ]);
    }

    public function edit($id)
    {
        $news = News::find($id);
        if ($news) {
            return response()->json([
                'status' => 200,
                'news' => $news,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy ID danh mục',
            ]);
        }
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

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:250',
            'slug' => 'required|max:250',
            'description' => 'required|max:250',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $news = News::find($id);
            if ($news) {
                $news->name = $request->input('name');
                $news->slug = $request->input('slug');
                $news->description = $request->input('description');
                $news->status = $request->input('status') == true ? '1' : '0';
                $news->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Sửa danh mục thành công!',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy ID danh mục',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $news = News::find($id);
        if ($news) {
            $news->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Xóa danh mục tin tức thành công',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy ID danh mục',
            ]);
        }
    }

}
