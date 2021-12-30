<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Question;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $comment = Comment::all();
        return response()->json([
            'data' => $comment,
            'status' => '200',
            'message' => 'success to list all comment']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required',
        ]);
        if ($validator->failed()){
            return response([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }else{
            $comment = new Comment;
            $comment->content = $request->content;
            $comment->user_id = auth('sanctum')->user()->id;
            $comment->question_id = $request->input('question_id');
            $comment->save();
            return response([
                'status' => 200,
                'data' => $comment,
            ]);
        }
        
        
    }

    public function votes(Request $request)
    {
        $question = Comment::find($request->input('id'));
        $question->increment('count_votes');
        $question->save();
        return response()->json([
            'status' => 200,
            'data' => $question,
            'message' => 'Success to save votes_couter'
        ]);
    }


    




    /**
     * Display the comment for each question
     * 
     * @param int $id
     * @return Response
     */ 
    public function getCommentById($id){
        $question = Question::where('id', $id)->first();
        $comments = Comment::where('question_id', $question->id)->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $comments,
            'message' => 'Success to get comment'
        ]);
    }
    



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // edit comment base on id
        $comment = Comment::find($id);
        if ($comment) {
            return response()->json([
                'status' => 200,
                'comment' => $comment,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Comment not found',
            ]);
        }
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
        $validator = Validator::make($request->all(), [
            'content' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        }else{
            $comment = new Comment;
            $comment->content = $request->input('content');
            $comment->user_id = auth('sanctum')->user()->id;
            $comment->question_id = $request->input('question_id');
            $comment->save();
            return response()->json([
                'status' => 200,
                'data' => $comment,
                'message' => 'Success to update new comment'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // delete a comment base on id
        $comment = Comment::find($id);
        $comment->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Success to delete comment'
        ]);
    }
}
