import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import GlobalStyle from './styles/global';
import ScrollToTop from './components/ScrollToTop';
import Championship from "./pages/Championship";

function App () {
    return (
        <div className="App">
            <BrowserRouter>
                <ScrollToTop/>
                    <Routes>
                        <Route path="/championship/:id" element={<Championship />}/>
                    </Routes>
            </BrowserRouter>
            {/*<GlobalStyle/>*/}
        </div>
    );
}

export default App;
