<?php

namespace App\Http\Controllers;

use App\Models\Kicker;
use App\Models\League;
use App\Models\NFLTeam;
use App\Models\Player;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Team;

class TeamsController extends Controller
{
    public function index($league_id = null)
    {
        if (!isset($league_id)) return redirect('/dashboard/leagues');

        $league = League::where('id', $league_id)->first();
        $teams = Team::where('league_id', $league_id)->get();


        return Inertia::render('Dashboard/Teams', [
            'teams' => $teams,
            'action' => 'list',
            'league' => $league
        ]);
    }

    public function show($team_id)
    {
        $team = Team::with('league')
            ->with('players')
            ->with('kickers')
            ->with('nfl_teams')
            ->where('id', $team_id)->first();


        // we need to filter out selected players...
        /*
            for each team, add players to selected players
            add kickers to selected kickers

            get all players
            filter out selected players.
        */

        $kickers = Kicker::orderBy('Name', 'ASC')->get();
        // $kickers = $this->filterSelectedKickers($kickers, $team->league_id);

        $players = Player::orderBy('name', 'ASC')->get();
        // $players = $this->filterSelectedPlayers($players, $team->league_id);

        return Inertia::render('Dashboard/Team', ['team' => $team, 'players' => $players, 'kickers' => $kickers]);
    }

    private function filterSelectedPlayers($players, $league_id)
    {
        // Log::debug($players);
        $teams=Team::where('league_id','=',$league_id)->with('players');
        foreach ($teams as $team) {
            $players = $players->diff($team->players->id)->get();
        }
        return $players;
        
    }

    private function filterSelectedKickers($kickers, $league_id)
    {
        $teams = Team::where('league_id', $league_id)->with('kickers')->get()->all();

        // dd($kickers);
        foreach ($teams as $team) {
            // dd($team->kickers);
            // $kickers = $kickers->diff($team->kickers->PlayerID)->get();
            foreach ($team->kickers as $k) {
                $kickers->firstWhere('PlayerID',$k->PlayerID)->forget();
            }
            // dd($kickers);
        }
        return $kickers;
    }

    public function store(Request $request)
    {
        $team = Team::with('league')
            ->with('players')
            ->with('kickers')
            ->with('nfl_teams')

            ->where('id', $request->team_id)->first();

        // $players = [];
        // $players['qb'] = Player::where('position', 'qb')->get();

        $team->players()->attach($request->player_id);

        // return Inertia::render('Dashboard/Team', ['team' => $team]);
    }

    public function store2(Request $request)
    {
        $validated = $request->validate(([
            'name' => 'required|min:3',
            'league_id' => 'required|numeric',
        ]));

        Team::create($validated);

        $league = League::where('id', $request->league_id)->first();
        $teams = Team::where('league_id', $request->league_id)->get();


        // return redirect('/dashboard/teams/' . $request->league_id);
        return Inertia::render('Dashboard/Teams', [
            'teams' => $teams,
            'action' => 'list',
            'league' => $league
        ]);
    }

    
}
