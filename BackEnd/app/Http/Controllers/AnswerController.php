<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Item;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function addanswer(Request $request)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $item_id = $request->item_id;
            $quiz_choice = $request->quiz_choice;

            $itemCheck = Item::where('id', $item_id)->first();
            if ($itemCheck) {
                $answeritem = new Answer;
                $answeritem->user_id = $user_id;
                $answeritem->item_id = $item_id;
                $answeritem->quiz_choice = $quiz_choice;
                $answeritem->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'Show result',
                    'kk' => $item_id,
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Quiz not found',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to submit result',
            ]);
        }
    }

    public function answer()
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $answeritem = Answer::where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'answer' => $answeritem,
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login go view result',
            ]);
        }
    }

    public function index()
    {
        $user = Answer::all();
        return response()->json([
            'status' => 200,
            'user' => $user,
        ]);
    }
}
