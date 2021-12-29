<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Quiz;
use App\Models\CategoryQuiz;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CategoryQuizController extends Controller
{
    public function index()
    {
        $category = CategoryQuiz::all();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }

    public function allcategies()
    {
        $categoryquiz = CategoryQuiz::all();
        if (count($categoryquiz) > 0) {
            return response()->json($categoryquiz, 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Quizzes Found',
            ]);
        }
    }

    public function allcategory()
    {
        $categoryquiz = CategoryQuiz::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $categoryquiz,
        ]);
    }

    public function edit($id)
    {
        $categoryquiz = CategoryQuiz::find($id);
        if ($categoryquiz) {
            return response()->json([
                'status' => 200,
                'category' => $categoryquiz,
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
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'description' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $categoryquiz = new CategoryQuiz;
            $categoryquiz->name = $request->input('name');
            $categoryquiz->slug = $request->input('slug');
            $categoryquiz->description = $request->input('description');
            $categoryquiz->status = $request->input('status') == true ? '1' : '0';
            $categoryquiz->save();
            return response()->json([
                'status' => 200,
                'message' => 'Thêm danh mục thành công',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'description' => 'required|max:191',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $categoryquiz = CategoryQuiz::find($id);
            if ($categoryquiz) {
                $categoryquiz->name = $request->input('name');
                $categoryquiz->slug = $request->input('slug');
                $categoryquiz->description = $request->input('description');
                $categoryquiz->status = $request->input('status') == true ? '1' : '0';
                $categoryquiz->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Cập nhật danh mục thành công',
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
        $categoryquiz = CategoryQuiz::find($id);
        if ($categoryquiz) {
            $categoryquiz->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Xóa danh mục thành công',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy ID danh mục',
            ]);
        }
    }

    // public function search($key)
    // {
    //     $categoryQuiz = CategoryQuiz::where('name', 'Like', "%$key%")->where('status', '0')->first();
    //     if ($categoryQuiz) {
    //         $item = Item::where('name', 'Like', "%$key%")->where('status', '0')->get();
    //         if ($item) {
    //             $quiz = Quiz::where('question', 'Like', "%$key%")->where('status', '0')->get();
    //             if ($quiz) {
    //                 return response()->json([
    //                     'status' => 200,
    //                     'quiz_data' => [
    //                         'item' => $item,
    //                         'quiz' => $quiz,
    //                     ],
    //                 ]);
    //             } else {
    //                 return response()->json([
    //                     'status' => 400,
    //                     'message' => 'No Quiz Avaiable',
    //                 ]);
    //             }
    //         } else {
    //             return response()->json([
    //                 'status' => 404,
    //                 'message' => 'No such Item Found',
    //             ]);
    //         }
    //     }
    // }
}
