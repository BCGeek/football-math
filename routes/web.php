<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\LeagueController;
use App\Http\Controllers\PlayersController;
use App\Http\Controllers\TeamsController;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {

    Route::get('/', function () {
        return Inertia::render('Dashboard/Home');
    })->name('dashboard');

    Route::get('league/report', [LeagueController::class, 'generateWeeklyReports']);
    Route::resource('league', LeagueController::class);

    Route::post('team', [TeamsController::class, 'store']);
    Route::get('team/{team_id}', [TeamsController::class, 'show'])->name('dashboard.team');

    Route::get('nfl/{pos?}', [PlayersController::class, 'index'])->name('dashboard.nfl');
});




require __DIR__ . '/auth.php';
