import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter} from "react-router-dom";

import Home from './components/home'

import 'materialize-css/dist/css/materialize.min.css'


const App = ()=>{
    return (
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
    )
}
render(<App />, document.getElementById('root'));

