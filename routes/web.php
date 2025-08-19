<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource('posts', PostController::class)->middleware('auth');
// GET /posts (mapped to PostController@index):
// Displays a list of all posts.

// GET /posts/create (mapped to PostController@create):
// Shows a form for creating a new post.

// POST /posts (mapped to PostController@store):
// Handles the submission of the form to create a new post.

// GET /posts/{post} (mapped to PostController@show):
// Displays a specific post.

// GET /posts/{postId}/edit (mapped to PostController@edit):
// Shows a form for editing a specific post.

// PUT/PATCH /posts/{post} (mapped to PostController@update):
// Updates a specific post after form submission.

// DELETE /posts/{post} (mapped to PostController@destroy):
// Deletes a specific post.

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
