import React from 'react'
import {Link} from "react-router-dom";
import Container from "../Container";
import {Menu} from "./styles";

const Header = () => {
    return(
        <Container>
            <h1>Meu Campeonato</h1>
            <Menu>
                <Link to="/"><li>Simular Campeonato</li></Link>
                <Link to="/campeonatos"><li>Listar Campeonatos</li></Link>
            </Menu>
        </Container>
    );
}

export default Header;