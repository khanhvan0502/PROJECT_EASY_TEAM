<?php

<<<<<<< HEAD
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\API\AuthController;
=======
>>>>>>> 64bfc5c6d74eed081e68c2a13e8f954e47185b46
use App\Http\Controllers\API\Search;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\NewsItemController;
use App\Http\Controllers\CategoryQuizController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::post('answer', [AnswerController::class, 'addanswer']);
Route::get('get-answer', [AnswerController::class, 'answer']);

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

<<<<<<< HEAD
=======
    //News
    Route::get('view-news', [NewsController::class, 'index']);
    Route::post('store-news', [NewsController::class, 'store']);
    Route::get('edit-news/{id}', [NewsController::class, 'edit']);
    Route::put('update-news/{id}', [NewsController::class, 'update']);
    Route::delete('delete-news/{id}', [NewsController::class, 'destroy']);
    Route::get('all-news', [NewsController::class, 'allnews']);
    
    //NewsItem
    Route::post('store-newsitem', [NewsItemController::class, 'store']);
    Route::get('view-news-item', [NewsItemController::class, 'index']);

>>>>>>> 64bfc5c6d74eed081e68c2a13e8f954e47185b46
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);

});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
