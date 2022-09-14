<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class Games extends Model
{
    use HasFactory;

    protected $table = 'games';

    public static function getScore()
    {
        $process = new Process(['python3', '../app/Scripts/teste.py']);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        return json_decode($process->getOutput(), true);
    }

    public static function getScoreboard()
    {
        $scoreboard = Games::getScore();
        $penalty = Games::getPenalty($scoreboard['firstTeam'], $scoreboard['secondTeam']);

        if($scoreboard['firstTeam'] > $scoreboard['secondTeam']){
            $winner = 'firstTeam';
        } else if($scoreboard['firstTeam'] < $scoreboard['secondTeam']){
            $winner = 'secondTeam';
        } else if ($penalty['firstTeam'] > $penalty['secondTeam']){
            $winner = 'firstTeam';
        } else {
            $winner = 'secondTeam';
        }

        return [
            "scoreFirstTeam" => $scoreboard['firstTeam'],
            "scoreSecondTeam" => $scoreboard['secondTeam'],
            "scoreFirstTeamPenalty" => !isset($penalty['firstTeam']) ?? null,
            "scoreSecondTeamPenalty" => !isset($penalty['secondTeam']) ?? null,
            "winner" => $winner
        ];
    }

    public static function getPenalty($firstTeam, $secondTeam)
    {
        if($firstTeam !== $secondTeam) return [];

        $control = true;
        $scoreboard = null;
        while($control == true){
            $scoreboard = Games::getScore();

            if($scoreboard['firstTeam'] !== $scoreboard['secondTeam']){
                $control = false;
            }
        }

        return $scoreboard;
    }
}
