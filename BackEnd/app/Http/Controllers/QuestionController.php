<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Question;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Controllers;
use Carbon\Carbon;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function getAllQuestions()
    {
        // $questions = Question::with('user')->get()->shuffle();
        // $questions = Question::with('user')->latest()->paginate(5);
        $questions = Question::with('user')->latest()->get();

        return response()->json([
            'status' => 400,
            'data' => $questions,
            'message' => 'Success to get all category question'
        ]);
    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // create a new question

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */



    public function store(Request $request)
    {
        // store a new question
        $validator = Validator::make($request->all(), [
            'title' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $question = new Question;
            $question->title = $request->input('title');
            $question->category_question_id = $request->input('category_question_id');
            $question->slug = Str::slug($request->get('title'));
            $question->content = $request->input('content');
            $question->tag_id = $request->input('tag_id');
            $question->user_id = auth('sanctum')->user()->id;
            $question->save();
            return response()->json([
                'status' => 200,
                'message' => 'Question created successfully',
                'data' => $question,
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        //
        $question = Question::where('slug', $slug)->first();
        $question->increment('views_couter');
        $question->save();
        return response()->json([
            'data' => $question->user_id, 
            'status' => 200,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Search question by title
     * param str $title
     * 
     */
    public function search($title)
    {
        $questions = Question::where('title', 'LIKE', '%' . $title . '%')->get();
        if (count($questions) > 0) {
            return response()->json([
                'status' => 400,
                'data' => $questions,
                'message' => 'Success to get all question'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No question found'
            ]);
        }
    }
}
