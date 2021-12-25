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

    public function edit($id)
    {
        $newsitem = NewsItem::find($id);
        if ($newsitem) {
            return response()->json([
                'status' => 200,
                'newsitem' => $newsitem,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy id...',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'news_id' => 'required|max:250',
            'name' => 'required|max:250',
            'slug' => 'required|max:30',
            'description' => 'required|max:250',
            'time' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $newsitem = NewsItem::find($id);
            if ($newsitem) {
                $newsitem->news_id = $request->input('news_id');
                $newsitem->name = $request->input('name');
                $newsitem->slug = $request->input('slug');
                $newsitem->description = $request->input('description');
                $newsitem->time = $request->input('time');

                if ($request->hasFile('image')) {
                    $path = $newsitem->image;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('upload/newsitem/', $filename);
                    $newsitem->image = 'upload/newsitem/' . $filename;
                }

                $newsitem->status = $request->input('status');
                $newsitem->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Cập nhật tin tức thành công!',
                ]);
            } 
            else 
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy!',
                ]);
            }
        }
    }
}
