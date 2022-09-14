import React from 'react';
import { api } from "../../services/api";
import Container from "../../components/Container";
import TitleSection from "../../components/TitleSection";
import { Box } from './styles';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Pagination} from "@mui/material";

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

    const [page, setPage] = React.useState(1);
    const history = useNavigate();
    const { page: currentPage } = useParams();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        history(`/championships/${value}`);
    };

    const getChampionships = async (page?: number) => {
        try {
            const conditionPage = page ? '?page=' + (page - 1) : '';
            const { data } = await api.get(`/scoreboard/championship${conditionPage}`);
            setChampionships(data.championships);
            setInfoResults({
                totalPosts: data.totalPosts,
                totalPages: data.totalPages
            })

            if (page) {
                setPage(page);
            }
        } catch (e) {
            console.log('Erro ao listar campeonatos!');
        }
    }

    React.useEffect(() => {
        const currentPageCondition = currentPage ? Number(currentPage) : 1;
        getChampionships(currentPageCondition);
    }, [currentPage]);

    return (
        <>
            <TitleSection text="Listando Campeonatos"/>
            <Container>
                {infoResults && (
                    <div>
                        <p><strong>Campeonatos Cadastrados:</strong> {infoResults.totalPosts}</p>
                    </div>
                )}

                {(championships && championships.length > 0) && championships.map(championship => (
                    <Link key={championship.id} to={`/championship/${championship.id}`}>
                        <Box>
                            <h1>{championship.id} - {championship.name}</h1>
                        </Box>
                    </Link>
                ))}

                <Pagination count={infoResults ? infoResults.totalPages : 0} page={page} onChange={handleChange} />
            </Container>
        </>
    )
}

export default List;