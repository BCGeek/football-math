<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NFLTeam extends Model
{
    use HasFactory;
    protected $table = 'nfl_teams';
    protected $primaryKey = 'PlayerId';
}
