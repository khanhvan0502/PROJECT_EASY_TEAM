<?php

namespace App\Http\Controllers;

use App\Models\CategoryQuestion;
use App\Models\CategoryQuiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryQuestionController extends Controller
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

    public function getAllCategoryQuestion()
    {
        $categoryQuestions = CategoryQuestion::all();
        if (count($categoryQuestions) > 0) {
            return response()->json([
                'status' => 400,
                'data' => $categoryQuestions,
                'message' => 'Success to get all category question'
            ]);
        }
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
        // save category question
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {
            $categoryQuestion = new CategoryQuestion;
            $categoryQuestion->name = $request->name;
            $categoryQuestion->slug = str_slug($request->name);
            $categoryQuestion->save();
            return response()->json([
                'status' => 200,
                'message' => 'Successfully created category question',
                'data' => $categoryQuestion,
            ]);
        }
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
}
