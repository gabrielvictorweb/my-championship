import React from 'react';
import { api } from "../../services/api";

interface Championships {
    id: number;
    name: string;
    created_at: string;
}

interface IResults {
    totalPosts: number;
    totalPages: number;
}

const List:React.FC = () => {
    const [championships, setChampionships] = React.useState<Championships[]>();
    const [infoResults, setInfoResults] = React.useState<IResults>();

    const getChampionships = async () => {
        try {
            const { data } = await api.get(`/scoreboard/championship`);
            setChampionships(data.championships);
            setInfoResults({
                totalPosts: data.totalPosts,
                totalPages: data.totalPages
            })
        } catch (e) {
            console.log('Erro ao listar campeonatos!');
        }
    }

    React.useEffect(() => {
        getChampionships();
    }, []);

    return (<>List</>)
}

export default List;