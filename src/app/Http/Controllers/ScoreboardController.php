<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class ScoreboardController extends BaseController
{
    private static function getScore()
    {
        $process = new Process(['python3', '../app/Scripts/teste.py']);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        return json_decode($process->getOutput(), true);
    }

    private static function getScoreboard()
    {
        $scoreboard = ScoreboardController::getScore();
        $penalty = ScoreboardController::getPenalty($scoreboard['firstTeam'], $scoreboard['secondTeam']);

        if($scoreboard['firstTeam'] > $scoreboard['secondTeam']){
            $teamWin = 'firstTeam';
        } else if($scoreboard['firstTeam'] < $scoreboard['secondTeam']){
            $teamWin = 'secondTeam';
        } else if ($penalty['firstTeam'] > $penalty['secondTeam']){
            $teamWin = 'firstTeam';
        } else {
            $teamWin = 'secondTeam';
        }

        return [
            "scoreboard" => $scoreboard,
            "penalty" => $penalty,
            "teamWin" => $teamWin
        ];
    }

    private static function getPenalty($firstTeam, $secondTeam)
    {
        if($firstTeam !== $secondTeam) return [];

        $control = true;
        $scoreboard = null;
        while($control == true){
            $scoreboard = ScoreboardController::getScore();

            if($scoreboard['firstTeam'] !== $scoreboard['secondTeam']){
                $control = false;
            }
        }

        return $scoreboard;
    }

    public function index()
    {
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

        $firstRound = array();
        $i = 0;
        while ($i < 8){
            $firstTeam = $teams[$i];
            $secondTeam = $teams[$i + 1];

            $scoreboard = $this::getScoreboard();
            $scoreboardInfos = [
                "firstTeam" => $firstTeam,
                "secondTeam" => $secondTeam,
                ...$scoreboard
            ];
            $firstRound[] = $scoreboardInfos;
            $secondRoundTeams[] = $scoreboardInfos[$scoreboard['teamWin']];

            $i = $i + 2;
        }

        $secondRound = array();
        $i = 0;
        while($i < 4) {
            $next = $i - 1;
            $firstTeam = $secondRoundTeams[$next + 1];
            $secondTeam = $secondRoundTeams[$next + 2];

            $scoreboard = $this::getScoreboard();
            $scoreboardInfos = [
                "firstTeam" => $firstTeam,
                "secondTeam" => $secondTeam,
                ...$scoreboard
            ];
            $secondRound[] = $scoreboardInfos;
            $finalRoundTeams[] = $scoreboardInfos[$scoreboard['teamWin']];

            $i = $i + 2;
        }

        # Final Round
        $firstTeam = $finalRoundTeams[0];
        $secondTeam = $finalRoundTeams[1];

        $scoreboard = $this::getScoreboard();
        $finalScore = [
            "firstTeam" => $firstTeam,
            "secondTeam" => $secondTeam,
            ...$scoreboard
        ];

        return response()->json(['scoreboard' => [
            'firstRound' => $firstRound,
            'secondRound' => $secondRound,
            'finalRound' => $finalScore
        ]]);
    }
}
