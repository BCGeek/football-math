<?php

namespace App\Http\Controllers;

use App\Models\League;
use App\Models\Stats;
use App\Models\StatsKickers;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DivisionController extends Controller
{
    public function index(Request $request)
    {
        $divisions = Division::all();

        return Inertia::render('Dashboard/Divisions', [
            'action' => 'list',
            'divisions' => $divisions
        ]);
    }

    public function show(Request $request)
    {

        $division = Divisions::with('leagues')->where('id', $request->id)->first();

        return Inertia::render('Dashboard/Divisions', [
            'action' => 'list',
            'division' => $division
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate(([
            'name' => 'required|unique:leagues|min:3',
        ]));

        Division::create($validated);

        return Inertia::render('Dashboard/Divisions', ['divisions' => Division::all(), 'action' => 'list']);
    }

}
