import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import GlobalStyle from './styles/global';
import ScrollToTop from './components/ScrollToTop';
import Championship from "./pages/Championship";
import List from "./pages/List";
import Register from "./pages/Register";

function App () {
    return (
        <div className="App">
            <BrowserRouter>
                <h1>My Championship</h1>
                <ScrollToTop/>
                <Routes>
                    <Route path="/championship/:id" element={<Championship />}/>
                    <Route path="/championships" element={<List />}/>
                    <Route path="/register" element={<Register />}/>
                </Routes>
            </BrowserRouter>
            {/*<GlobalStyle/>*/}
        </div>
    );
}

export default App;
