<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayersController extends Controller
{
    public function index(Request $request)
    {
        if (isset($request->pos)) {
            $players = Player::where('position', $request->pos)->orderBy('Name', 'ASC')->paginate(400);
        } else {
            $players = Player::orderBy('Name', 'ASC')->paginate(10);
        }
        return Inertia::render('Dashboard/NFL', ['players' => $players]);
    }
}
