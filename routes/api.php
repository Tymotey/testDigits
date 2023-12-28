<?php

use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\TaskController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// User actions
Route::group(['namespace' => 'Api'], function () {
    Route::post('login', [AuthenticationController::class, 'login']);

    // User actions for authenticated users
    Route::middleware('auth:api')->group(function () {
        Route::get('logout', [AuthenticationController::class, 'logout']);
        Route::get('profile', [AuthenticationController::class, 'profile']);
    });
});

// Add "V1" prefix to "Api" links
Route::group(['namespace' => 'App\Http\Controllers\Api\V1', 'prefix' => 'v1'], function () {
    Route::middleware(['auth:api', 'role:admin,user'])->group(function () {
        Route::apiResource('projects', ProjectController::class);
        Route::apiResource('tasks', TaskController::class);
        Route::apiResource('users', UserController::class);
    });
});