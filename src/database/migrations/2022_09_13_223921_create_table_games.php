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
                $table->tinyint('scoreFirstTeam');
                $table->int('scorePointsFirstTeam')->nullable();
                $table->tinyint('scoreSecondTeam');
                $table->int('scorePointsSecondTeam')->nullable();
                $table->enum('winner', ['firstTeam', 'secondTeam'])->default('firstTeam');
                $table->tinyint('scoreFirstTeamPenalty')->nullable();
                $table->tinyint('scoreSecondTeamPenalty')->nullable();
                $table->unsignedBigInteger('championship_id');
                $table->foreign('championship_id')->references('championship.id')->on('championship')->onDelete('cascade');
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
