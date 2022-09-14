import React from 'react';
import {Match, SingleEliminationBracket, SVGViewer} from "@g-loot/react-tournament-brackets";
import useWindowSize, {Size} from "../../hooks/useWindow/useWindow";
import {useParams} from "react-router-dom";
import {api} from "../../services/api";
import Container from "../../components/Container";
import TitleSection from "../../components/TitleSection";

interface Game {
    id: number;
    winner: string;
    scoreFirstTeam: number;
    scoreSecondTeam: number;
    scoreFirstTeamPenalty: null | number;
    scoreSecondTeamPenalty: null | number;
    firstTeamName: string;
    secondTeamName: string;
    round: string;
    name: string;
    created_at: string;
}

interface Rounds {
    final: Game[];
    second: Game[];
    first: Game[];
}

const Championship: React.FC = () => {
    const [rounds, setRounds] = React.useState<Rounds>();
    const [matchesState, setMatchesState] = React.useState<any>([]);

    const size: Size = useWindowSize();
    const { id } = useParams();

    const getChampionship = async () => {
        try {
            const { data } = await api.get(`/scoreboard/championship/${id}`);
            setRounds(data.rounds);
        } catch (e) {
            console.log('Erro ao listar campeonato!');
        }
    }

    React.useEffect(() => {
        getChampionship();
    }, []);

    React.useEffect(() => {
        if(rounds){
            const matches: any = [];

            rounds.first.forEach((game,index) => {
                const nextGame = rounds.second.find(nextGame => [nextGame.firstTeamName, nextGame.secondTeamName].includes(game.firstTeamName) || [nextGame.firstTeamName, nextGame.secondTeamName].includes(game.secondTeamName))

                if(!nextGame) return;

                const dateGame = new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(game.created_at));

                matches.push({
                    "id": game.id,
                    "name": game.scoreFirstTeamPenalty ? `Decisão nos Pênaltis ${game.scoreFirstTeamPenalty} x ${game.scoreSecondTeamPenalty}` : '',
                    "nextMatchId": nextGame.id,
                    "tournamentRoundText": "Quartas de Final",
                    "startTime": dateGame,
                    "state": "SCORE_DONE",
                    "participants": [
                        {
                            "id": `${game.id}-1`,
                            "isWinner": game.winner === 'firstTeam',
                            "status": "PLAYED",
                            "name": game.firstTeamName,
                            "picture": null,
                            "resultText": `${game.scoreFirstTeam}`,
                        },
                        {
                            "id": `${game.id}-2`,
                            "isWinner": game.winner === 'secondTeam',
                            "status": "PLAYED",
                            "name": game.secondTeamName,
                            "picture": null,
                            "resultText": `${game.scoreSecondTeam}`,
                        }
                    ]
                })
            })

            rounds.second.forEach((game, index) => {
                const nextGame = rounds.final.find(nextGame => [nextGame.firstTeamName, nextGame.secondTeamName].includes(game.firstTeamName) || [nextGame.firstTeamName, nextGame.secondTeamName].includes(game.secondTeamName))

                if(!nextGame) return;

                const dateGame = new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(game.created_at));

                matches.push({
                    "id": game.id,
                    "name": game.scoreFirstTeamPenalty ? `Decisão nos Pênaltis ${game.scoreFirstTeamPenalty} x ${game.scoreSecondTeamPenalty}` : '',
                    "nextMatchId": nextGame.id,
                    "tournamentRoundText": "Semi-finais",
                    "startTime": dateGame,
                    "state": "SCORE_DONE",
                    "participants": [
                        {
                            "id": `${game.id}-1`,
                            "isWinner": game.winner === 'firstTeam',
                            "status": "PLAYED",
                            "name": game.firstTeamName,
                            "picture": null,
                            "resultText": `${game.scoreFirstTeam}`,
                        },
                        {
                            "id": `${game.id}-2`,
                            "isWinner": game.winner === 'secondTeam',
                            "status": "PLAYED",
                            "name": game.secondTeamName,
                            "picture": null,
                            "resultText": `${game.scoreSecondTeam}`,
                        }
                    ]
                })
            })

            rounds.final.forEach((game, index) => {
                const dateGame = new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(game.created_at));

                matches.push({
                    "id": game.id,
                    "name": game.scoreFirstTeamPenalty ? `Decisão nos Pênaltis ${game.scoreFirstTeamPenalty} x ${game.scoreSecondTeamPenalty}` : '',
                    "nextMatchId": null,
                    "tournamentRoundText": "Finais",
                    "startTime": dateGame,
                    "state": "SCORE_DONE",
                    "participants": [
                        {
                            "id": `${game.id}-1`,
                            "isWinner": game.winner === 'firstTeam',
                            "status": "PLAYED",
                            "name": game.firstTeamName,
                            "picture": null,
                            "resultText": `${game.scoreFirstTeam}`,
                        },
                        {
                            "id": `${game.id}-2`,
                            "isWinner": game.winner === 'secondTeam',
                            "status": "PLAYED",
                            "name": game.secondTeamName,
                            "picture": null,
                            "resultText": `${game.scoreSecondTeam}`,
                        }
                    ]
                })
            })

            setMatchesState(matches);
        }
    }, [rounds]);

    if (!size.width || !size.height ) return <></>;

    const finalWidth = Math.max(size.width - 50, 500);
    const finalHeight = Math.max(size.height - 100, 500);

    if(matchesState.length === 0) return <></>;

    const nameChampionship = rounds ? rounds.first[0].name : 'Carregando...';

    return (
        <>
            <TitleSection text={`Campeonato: ${nameChampionship}`}/>
            <Container>
                <SingleEliminationBracket
                    matches={matchesState}
                    matchComponent={Match}
                    svgWrapper={({ children, ...props }) => (
                        <SVGViewer width={finalWidth} height={finalHeight} {...props}>
                            {children}
                        </SVGViewer>
                    )}
                />
            </Container>
        </>
    );
}

export default Championship;