<?php

use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\TaskController;
use Illuminate\Http\Request;
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

Route::group(['namespace' => 'Api'], function () {
    // TODO: register?!
    Route::post('login', [AuthenticationController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::get('logout', [AuthenticationController::class, 'logout']);
    });
});
Route::group(['namespace' => 'Api', 'prefix' => 'v1'], function () {
    Route::middleware('auth:api')->group(function () {
        Route::apiResource('projects', ProjectController::class);
        Route::apiResource('tasks', TaskController::class);
    });
});