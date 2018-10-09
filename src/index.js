import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter} from "react-router-dom";

import Main from './components/main'

//import Main from './components/mainMaterias'
import 'materialize-css/dist/css/materialize.min.css'


const App = ()=>{
    return (
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    )
}
render(<App />, document.getElementById('root'));

