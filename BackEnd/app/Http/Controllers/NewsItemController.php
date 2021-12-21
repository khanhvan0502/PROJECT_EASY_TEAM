<?php

namespace App\Http\Controllers;

use App\Models\NewsItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsItemController extends Controller
{

    public function index()
    {
        $newsitem = NewsItem::all();
        return response()->json([
            'status' => 200,
            'newsitem' => $newsitem,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'news_id' => 'required|max:250',
            'name' => 'required|max:250',
            'slug' => 'required|max:30',
            'description' => 'required|max:250',
            'time' => 'required|max:191',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $newsitem = new NewsItem;
            $newsitem->news_id = $request->input('news_id');
            $newsitem->name = $request->input('name');
            $newsitem->slug = $request->input('slug');
            $newsitem->description = $request->input('description');
            $newsitem->time = $request->input('time');
            // $newsitem->image = $request->input('image');

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('upload/newsitem/', $filename);
                $newsitem->image = 'upload/newsitem/' . $filename;
            }

            $newsitem->status = $request->input('status') == true ? '1' : '0';
            $newsitem->save();

            return response()->json([
                'status' => 200,
                'message' => 'Thêm tin tức thành công!',
            ]);
        }

    }
}
