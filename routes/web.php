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
    Route::post('league/addteam', [LeagueController::class, 'addTeam']);
    // Route::get('league/{league_id}', [LeagueController::class, 'show'])->name('dashboard.league');

    Route::resource('league', LeagueController::class);

    Route::get('leagues', [LeagueController::class, 'leagues']);



    Route::post('team/add', [TeamsController::class, 'store']);
    Route::post('team/delete', [TeamsController::class, 'destroy']);
    Route::post('team/update', [TeamsController::class, 'update']);
    

    Route::get('team/{team_id}', [TeamsController::class, 'show'])->name('dashboard.team');

    Route::get('nfl/{pos?}', [PlayersController::class, 'index'])->name('dashboard.nfl');

});




require __DIR__ . '/auth.php';
