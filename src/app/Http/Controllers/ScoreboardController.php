<?php

namespace App\Http\Controllers;

use App\Models\Championships;
use App\Models\Games;
use Illuminate\Routing\Controller as BaseController;

class ScoreboardController extends BaseController
{
    public function save()
    {
        $championshipName = 'Campeonato';

        $championship = new Championships();
        $championship->name = $championshipName;
        $championship->save();

        $teams = array(
            'Time 1',
            'Time 2',
            'Time 3',
            'Time 4',
            'Time 5',
            'Time 6',
            'Time 7',
            'Time 8',
        );
        shuffle($teams);

        // First Round
        $firstRound = array();
        $i = 0;
        while ($i < 8){
            $firstTeam = $teams[$i];
            $secondTeam = $teams[$i + 1];

            $scoreboard = Games::getScoreboard();
            $scoreboardInfos = [
                "championship_id" => $championship->id,
                "firstTeamName" => $firstTeam,
                "secondTeamName" => $secondTeam,
                ...$scoreboard
            ];
            $firstRound[] = $scoreboardInfos;
            $secondRoundTeams[] = $scoreboardInfos[$scoreboard['winner'] . 'Name'];

            $i = $i + 2;
        }

        Games::insert($firstRound);

        // Second Round
        $secondRound = array();
        $i = 0;
        while($i < 4) {
            $next = $i - 1;
            $firstTeam = $secondRoundTeams[$next + 1];
            $secondTeam = $secondRoundTeams[$next + 2];

            $scoreboard = Games::getScoreboard();
            $scoreboardInfos = [
                "championship_id" => $championship->id,
                "firstTeamName" => $firstTeam,
                "secondTeamName" => $secondTeam,
                "round" => 'second',
                ...$scoreboard
            ];
            $secondRound[] = $scoreboardInfos;
            $finalRoundTeams[] = $scoreboardInfos[$scoreboard['winner'] . 'Name'];

            $i = $i + 2;
        }

        Games::insert($secondRound);

        # Final Round
        $firstTeam = $finalRoundTeams[0];
        $secondTeam = $finalRoundTeams[1];

        $scoreboard = Games::getScoreboard();
        $finalRound = [
            "championship_id" => $championship->id,
            "firstTeamName" => $firstTeam,
            "secondTeamName" => $secondTeam,
            "round" => 'final',
            ...$scoreboard
        ];

        Games::insert($finalRound);

        $games = Games::select('id')->get();

        return response()->json(['scoreboard' => $games]);
    }

    public function find($id)
    {
        $game = Games::select('games.id', 'firstTeamName', 'secondTeamName', 'round')
            ->join('championships', 'games.championship_id', '=', 'championships.id')
            ->where('games.championship_id', '=', $id)
            ->get();

        return response()->json(['game' => $game]);
    }

    public function index()
    {
        $championships = Championships::select('id', 'name', 'created_at')
            ->get();

        return response()->json(['championships' => $championships]);
    }
}
