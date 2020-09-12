<?php

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Pages
Route::post('/login','UserController@login');
Route::post('/register','UserController@register');
Route::get('/logout','UserController@logout');
Route::put('/user/{id}','UserController@updateUser');

// Reports
Route::get('reports','ReportController@index');
Route::get('reports/{report}','ReportController@show');
Route::post('reports','ReportController@store');
Route::put('reports/{report}','ReportController@update');
Route::delete('reports/{report}','ReportController@delete');

// Comment
Route::get('comments','CommentController@index');
Route::get('comment/{comment}','CommentController@showOne');
Route::get('comments/{id}','CommentController@show');
Route::post('comments','CommentController@store');
Route::delete('comments/{comment}','CommentController@delete');

// Study
Route::get('studies','StudyController@index');
Route::get('studies/{study}','StudyController@show');
Route::post('studies','StudyController@store');
Route::delete('studies/{study}','StudyController@delete');