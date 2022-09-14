<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableGames extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('games')) {
            Schema::create('games', function (Blueprint $table) {
                $table->id();
                $table->string('firstTeamName', 60);
                $table->string('secondTeamName', 60);
                $table->tinyInteger('scoreFirstTeam');
                $table->mediumInteger('scorePointsFirstTeam')->nullable();
                $table->tinyInteger('scoreSecondTeam');
                $table->mediumInteger('scorePointsSecondTeam')->nullable();
                $table->enum('winner', ['firstTeam', 'secondTeam'])->default('firstTeam');
                $table->tinyInteger('scoreFirstTeamPenalty')->nullable();
                $table->tinyInteger('scoreSecondTeamPenalty')->nullable();
                $table->unsignedBigInteger('championship_id');
                $table->foreign('championship_id')->references('id')->on('championships')->onDelete('cascade');
                $table->enum('round', ['first', 'second', 'final'])->default('first');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
}
