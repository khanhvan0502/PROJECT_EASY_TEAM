<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\Search;
use App\Http\Controllers\CategoryQuizController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CategoryQuestionController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('get-category-quiz', [FrontendController::class, 'category']);
Route::get('fetch-items-quiz/{slug}', [FrontendController::class, 'item']);
Route::get('fetch-quiz/{slug}', [FrontendController::class, 'quiz']);
Route::get('search/{key}', [Search::class, 'search']);

Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function () {

    Route::get('checkingAuthenticated', function () {
        return response()->json(['message' => 'You are in', 'status' => 200], 200);
    });

    // Profile
    Route::get('profile', [UserController::class, 'index']);
    Route::post('profile/add', [UserController::class, 'store']);
    Route::get('profile/{id}', [UserController::class, 'edit']);
    Route::delete('profile/delete/{id}', [UserController::class, 'destroy']);
    Route::put('profile/edit/{id}', [UserController::class, 'update']);

    // Cagegory Quiz
    Route::get('view-category-quiz', [CategoryQuizController::class, 'index']);
    Route::post('store-category-quiz', [CategoryQuizController::class, 'store']);
    Route::get('edit-category-quiz/{id}', [CategoryQuizController::class, 'edit']);
    Route::put('update-category-quiz/{id}', [CategoryQuizController::class, 'update']);
    Route::delete('delete-category-quiz/{id}', [CategoryQuizController::class, 'destroy']);
    Route::get('all-category-quiz', [CategoryQuizController::class, 'allcategory']);
    Route::get('all-category-quizzes', [CategoryQuizController::class, 'allcategies']);

    //Item Category
    Route::get('view-item-quiz', [ItemController::class, 'index']);
    Route::post('store-item-quiz', [ItemController::class, 'store']);
    Route::get('edit-item-quiz/{id}', [ItemController::class, 'edit']);
    Route::post('update-item-quiz/{id}', [ItemController::class, 'update']);
    Route::delete('delete-item-quiz/{id}', [ItemController::class, 'destroy']);
    Route::get('all-item-quiz', [ItemController::class, 'allitem']);
    
    // Quiz
    Route::get('view-quiz', [QuizController::class, 'index']);
    Route::post('store-quiz', [QuizController::class, 'store']);
    Route::get('edit-quiz/{id}', [QuizController::class, 'edit']);
    Route::post('update-quiz/{id}', [QuizController::class, 'update']);
    Route::delete('delete-quiz/{id}', [QuizController::class, 'destroy']);
    Route::get('get-all-quiz', [QuizController::class, 'getAllQuizzes']);
    
    
    // Category Question
    
    
    // Ask Question
    
});

Route::middleware(['auth:sanctum'])->group(function () {
    // Question
    Route::post('store-question', [QuestionController::class, 'store']);
    // Comment
    Route::post('store-comment', [CommentController::class, 'store']);
    
    
    Route::post('logout', [AuthController::class, 'logout']);
    
    
    // Category Question
});
Route::get('get-all-question', [QuestionController::class, 'getAllQuestions']);
Route::get('question/search/{name}', [QuestionController::class, 'search']);
// Route::get('question/{slug}', [QuestionController::class, 'show']);
Route::get('question/{slug}/', [QuestionController::class, 'show']);


Route::post('store-category-question', [CategoryQuestionController::class, 'store']);
Route::get('get-all-category-question', [CategoryQuestionController::class, 'getAllCategoryQuestion']);


// Tag
Route::post('store-tag', [TagController::class, 'store']);
Route::get('get-all-tag', [TagController::class, 'getAllTag']);

// Comment

