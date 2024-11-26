<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return 'Laravel is working!';
});

Route::get('login', [AuthController::class, 'showLoginForm']);
Route::post('login', [AuthController::class, 'webLogin']);
// Laravel example in routes/web.php
Route::middleware('auth:api')->get('/logout', function (Request $request) {
    auth()->logout();  // Logout the user
    return response()->json(['message' => 'Successfully logged out']);
});
