<?php

use App\Http\Controllers\ScoreboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/scoreboard/generate', [ScoreboardController::class, 'save']);
Route::get('/scoreboard/championship/{id}', [ScoreboardController::class, 'find']);
Route::get('/scoreboard/championship', [ScoreboardController::class, 'index']);
