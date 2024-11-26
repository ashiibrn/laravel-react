<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WidgetController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
});

// Public user route (if you want to expose a list of users publicly)
Route::get('/users', [UserController::class, 'index']);

// Authenticated routes (requires Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return response()->json(['user' => $request->user()]);
    });

    // Authenticated CRUD routes for users
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);

    // Widget routes
    Route::get('/widgets', [WidgetController::class, 'index']);
    Route::post('/widgets', [WidgetController::class, 'store']);
    Route::get('/widget/{widgetType}/issues', [WidgetController::class, 'getIssues']);
    Route::get('/widgets/issue-counts', [WidgetController::class, 'getIssueCounts']);
    Route::delete('/widgets', [WidgetController::class, 'deleteWidget']);

    Route::post('/reports', [ReportController::class, 'store']);
    Route::get('/reports', [ReportController::class, 'index']);

    Route::get('/messages', [MessageController::class, 'index']); 
    Route::post('/messages', [MessageController::class, 'store']); 

    // Chat routes
    Route::get('/chats', [ChatController::class, 'index']);
    Route::post('/chats', [ChatController::class, 'store']);
});
