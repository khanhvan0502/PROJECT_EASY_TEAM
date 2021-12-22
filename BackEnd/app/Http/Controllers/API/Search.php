<?php

namespace App\Http\Controllers\API;

use App\Models\Item;
use App\Models\Quiz;
use App\Models\CategoryQuiz;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Search extends Controller
{
    public function search($key)
    {
        $categoryQuiz = CategoryQuiz::where('name', 'Like', "%$key%")->where('status', '0')->first();
        if ($categoryQuiz) {
            $item = Item::where('name', 'Like', "%$key%")->where('status', '0')->get();
            if ($item) {
                $quiz = Quiz::where('question', 'Like', "%$key%")->where('status', '0')->get();
                if ($quiz) {
                    return response()->json([
                        'status' => 200,
                        'quiz_data' => [
                            'item' => $item,
                            'quiz' => $quiz,
                        ],
                    ]);
                } else {
                    return response()->json([
                        'status' => 400,
                        'message' => 'No Quiz Avaiable',
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No such Item Found',
                ]);
            }
        }
    }

<<<<<<< HEAD
    // function searchl( Request $req ){
    //     return $req->input();
    // }
=======
    function searchl( Request $req ){
        return $req->input();
    }
>>>>>>> 64bfc5c6d74eed081e68c2a13e8f954e47185b46
}
