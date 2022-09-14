import React from 'react';
import TitleSection from "../../components/TitleSection";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Form } from './styles';
import {api} from "../../services/api";
import {useNavigate} from "react-router-dom";
import { useSnackbar } from 'notistack';

const Register:React.FC = () => {
    const [teams, setTeams] = React.useState<string[]>([]);
    const [input, setInput] = React.useState('');
    const [championship, setChampionship] = React.useState('');

    const history = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const messageError = (message: string) => {
        enqueueSnackbar(message, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'center' } });

    }

    const handleTeam = (e: React.FormEvent) => {
        e.preventDefault();

        if(teams.includes(input)){
            messageError("Não é possivél inserir 2 Times com o mesmo nome!");
            return;
        }

        if(input === ''){
            messageError("O nome do Time não pode estar vazio!");
            return;
        }

        if(teams.length === 8){
            messageError("A lista tem um limite de 8 Times");
            return;
        }

        setTeams([...teams, input])
        setInput('');
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value);
    }

    const handleInputChampionship = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChampionship(e.currentTarget.value);
    }

    const saveChampionship = async () => {
        try {
            const { data } = await api.post('/scoreboard/championship', {
                championship,
                teams
            });

            history(`/campeonato/${data.id}`);
        } catch (e) {
            messageError("Ocorreu um erro ao salvar o campeonato!");
        }
    }

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault();

        if(championship === ''){
            messageError("O nome do Campeonato não pode estar vazio!");
            return;
        }

        if(teams.length !== 8){
            messageError("A lista deve conter 8 times");
            return;
        }

        saveChampionship();
    }

    return (
        <>
            <TitleSection text="Cadastre o Campeonato"/>
            <Container>
                <Form onSubmit={handleTeam}>
                    <Input required onChange={handleInputChampionship} value={championship} placeholder="Ex: Compa do Mundo" label="Nome do Campeonato"/>
                    <div className="ds-flex">
                        <Input onChange={handleInput} value={input} placeholder="Ex: PSD" label="Adicione 8 times"/>
                        <Button type="submit" onClick={handleTeam}>Adicionar</Button>
                    </div>
                </Form>
                <Form onSubmit={handleForm}>
                    <ul className="list">
                        {teams.map((team, index) => (
                            <li key={index}>{team}</li>
                        ))}
                    </ul>
                    <Button type="submit">Enviar</Button>
                </Form>
            </Container>
        </>
    )
}

export default Register;