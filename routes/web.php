<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});


// API ROUTES ==================================  
Route::group(array('prefix' => 'api/user'), function() {

    Route::get('/', 'UserController@index');
    Route::post('login', 'UserController@login');
    Route::post('register', 'UserController@register');
    Route::put('/{id}', 'UserController@update');
    Route::delete('/{id}', 'UserController@delete');

});

// CATCH ALL ROUTE =============================  
// all routes that are not home or api will be redirected to the frontend 
// this allows angular to route them 
// App::missing(function($exception) { 
//     return View::make('index'); 
// });
