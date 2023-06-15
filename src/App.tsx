import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import FormPage from "./pages/FormPage";
import "./styles/style.css"
import {Provider} from "react-redux";
import {store} from "./redux";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter basename={"/frontCloudCamp"}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/create" element={<FormPage/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
