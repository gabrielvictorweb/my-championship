import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Route, Routes } from 'react-router';
import GlobalStyle from './styles/global';
import ScrollToTop from './components/ScrollToTop';
import Championship from "./pages/Championship";
import List from "./pages/List";
import Register from "./pages/Register";
import {SnackbarProvider} from "notistack";
import Header from "./components/Header";

function App () {
    return (
        <div className="App">
            <SnackbarProvider maxSnack={10}>
                <BrowserRouter>
                    <ScrollToTop/>
                    <Header />
                    <Routes>
                        <Route path="/campeonato/:id" element={<Championship />}/>
                        <Route path="/campeonatos" element={<List />}/>
                        <Route path="/campeonatos/:page" element={<List />}/>
                        <Route path="/" element={<Register />}/>
                        <Route path="/register" element={<Register />}/>
                    </Routes>
                </BrowserRouter>
                <GlobalStyle/>
            </SnackbarProvider>
        </div>
    );
}

export default App;
