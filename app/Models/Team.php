<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = ['league_id', 'name'];

    public function league()
    {
        return $this->belongsTo(League::class);
    }

    public function players()
    {
        return $this->belongsToMany(Player::class, 'player_team', 'team_id', 'player_id');
    }

    public function kickers()
    {
        return $this->belongsToMany(Kicker::class, 'player_team', 'team_id', 'player_id');
    }

    public function nfl_teams()
    {
        return $this->belongsToMany(NFLTeam::class, 'player_team', 'team_id', 'player_id');
    }
}
