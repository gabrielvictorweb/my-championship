<?php

namespace App\Http\Controllers;

use App\Models\Championships;
use App\Models\Games;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ScoreboardController extends BaseController
{
    public function index(Request $request)
    {
        try{
            $championships = Championships::select('id', 'name', 'created_at')->orderBy('created_at', 'DESC');

            // Paginação
            $qpp = 10;
            $count = $championships->count();
            $page = $request->input('page') ?? 0;
            $skip = $page * $qpp;
            $results = $championships->skip($skip)->take($qpp)->get();

            return response()->json(['championships' => $results, 'totalPosts' => $count, 'totalPages' => ceil($count / $qpp)], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'INTERNAL_ERROR'], 500);
        }
    }

    public function find($id)
    {
        try{
            $game = Games::select('games.id', 'championships.created_at', 'championships.name', 'games.winner', 'games.scoreFirstTeam',
                'games.scoreSecondTeam', 'scoreFirstTeamPenalty', 'scoreSecondTeamPenalty', 'firstTeamName', 'secondTeamName', 'round')
                ->join('championships', 'games.championship_id', '=', 'championships.id')
                ->where('games.championship_id', '=', $id)
                ->get()
                ->groupBy('round');

            return response()->json(['rounds' => $game], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function save(Request $request)
    {
        try {
            $data = $request->input();

            $validator = Validator::make($data, [
                'championship' => 'required',
                'teams' => 'required|array|size:8',
                'teams.*' => 'distinct'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()->all()], 400);
            }

            $championship = new Championships();
            $championship->name = $data['championship'];
            $championship->save();

            // Embaralhando times
            $teams = $data['teams'];
            shuffle($teams);

            // First Round
            $firstRound = array();
            $secondRoundTeams = array();
            $i = 0;
            while ($i < 8){
                $firstTeam = $teams[$i];
                $secondTeam = $teams[$i + 1];

                $scoreboard = Games::getScoreboard();
                $scoreboardInfos = [
                    "championship_id" => $championship->id,
                    "firstTeamName" => $firstTeam,
                    "secondTeamName" => $secondTeam,
                    "round" => 'first',
                    ...$scoreboard
                ];

                $firstRound[] = $scoreboardInfos;
                $secondRoundTeams[] = $scoreboardInfos[$scoreboard['winner'] . 'Name'];

                $i = $i + 2;
            }

            // Second Round
            $secondRound = array();
            $finalRoundTeams = array();
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

            // Final Round
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

            // Salvando jogos
            Games::insert([$finalRound, ...$secondRound, ...$firstRound]);

            return response()->json(['id' => $championship->id], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'INTERNAL_ERROR'], 500);
        }
    }
}
