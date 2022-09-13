<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class ScoreboardController extends BaseController
{
    public function index()
    {
        $scoreboardOutput = array();
        for ($i = 0; $i < 8; $i++){
            $process = new Process(['python3', '../app/Scripts/teste.py']);
            $process->run();

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }

            $scoreboard = json_decode($process->getOutput(), true);

            $scoreboardOutput[] = $scoreboard;
        }

        return response()->json(['scoreboard' => $scoreboardOutput]);
    }
}
