<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CategoryQuizController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\QuizController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function () {

    Route::get('checkingAuthenticated', function () {
        return response()->json(['message' => 'You are in', 'status' => 200], 200);
    });
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

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

