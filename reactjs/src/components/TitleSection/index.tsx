import React from 'react';
import Container from '../Container';
import { Title, ContainerFlex } from './styles';
import { useNavigate } from 'react-router-dom';

interface Props {
    text: string;
};

const TitleSection: React.FC<Props> = ({ text }) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <Container className="bg-white-3 padding-content-20">
            <ContainerFlex>
                <Title>{text}</Title>
            </ContainerFlex>
        </Container>
    );
};

export default TitleSection;
