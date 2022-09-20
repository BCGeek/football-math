<?php

namespace App\Http\Controllers;

use App\Models\League;
use App\Models\Stats;
use App\Models\StatsKickers;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeagueController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('lid')) {
            if (auth()->user()->id === 1) {
                $league = League::with('teams')->where('id', $request->lid)->first();
            }
        } else {
            $league = League::with('teams')->where('id', auth()->user()->league_id)->first();
        }

        return Inertia::render('Dashboard/League', [
            'action' => 'list',
            'league' => $league
        ]);
    }

    public function show()
    {

        $league = League::with('teams')->where('id', auth()->user()->league_id)->first();

        return Inertia::render('Dashboard/League', [
            'action' => 'list',
            'league' => $league
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate(([
            'name' => 'required|unique:leagues|min:3',
        ]));

        League::create($validated);

        return Inertia::render('Dashboard/Leagues', ['leagues' => League::all(), 'action' => 'list']);
    }

    public function generateWeeklyReports(Request $request)
    {
        /*
            we know the league number by the auth user
            for each team in the league, generate the report.
        */

        // $league = League::with('teams')->where('id', auth()->user()->league_id)->first();
        $league = League::with('teams')->where('id', $request->league_id)->first();
        // return $league;

        // $league = $request->league_id;

        $reports = [];
        foreach ($league->teams as $team) {
            $report = new \StdClass();
            $report->title = "Weekly Report";
            $report->sub = "Week #" . $request->week;

            $report->team = $team->name;
            $report->data = $this->getData($team->id, $request->week);
            $report->kickers = $this->getKickerData($team->id, $request->week);

            $reports[] = $report;
        }

        return Inertia::render('Dashboard/LeagueReport', [
            'reports' => $reports,
            'league' => $league
        ]);


        // return response()->json($reports, 200);
    }

    private function getData($teamId, $week)
    {
        $team = Team::with('players')->where('id', $teamId)->first();
        $players = [];

        foreach ($team->players as $player) {
            $p = new \StdClass();
            $p->PlayerID = $player->PlayerID;
            $p->name = $player->Name;
            $p->position = $player->Position;
            $p->team = $player->Team;

            $p->stats = Stats::where('PlayerID', '=', $player->PlayerID)->where('week', $week)->orderBy('Position', 'ASC')->first();
            // $p->scores = $this->computeScores($p->stats);
            $players[] = $p;
        }

        return $players;
    }

    private function computeScores($player)
    {
        $scores = [];
        $scores['PassingYards'] = round($player->PassingYards / 50);
        $scores['RushingYards'] = round($player->RushingYards / 20);
        $scores['ReceivingYards'] = round($player->ReceivingYards / 20);
        $scores['PassingTouchdowns'] = $player->PassingTouchdowns * 6;
        $scores['RushingTouchdowns'] = $player->RushingTouchdowns * 6;
        $scores['ReceivingTouchdowns'] = $player->ReceivingTouchdowns * 6;
        return $scores;
    }

    private function getKickerData($teamId, $week)
    {
        $team = Team::with('kickers')->where('id', $teamId)->first();

        $kickers = [];

        foreach ($team->kickers as $kicker) {
            $p = new \StdClass();
            $p->PlayerID = $kicker->PlayerID;
            $p->name = $kicker->Name;
            $p->position = $kicker->Position;
            $p->team = $kicker->Team;

            $p->stats = StatsKickers::where('PlayerID', '=', $kicker->PlayerID)->where('week', $week)->first();
            $kickers[] = $p;
        }

        return $kickers;
    }
}
