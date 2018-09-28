import React from 'react';
import {render} from 'react-dom';
import { MemoryRouter} from "react-router-dom";

import Main from './components/main'

import 'materialize-css/dist/css/materialize.min.css'


const App = ()=>{
    return (
        <MemoryRouter>
            <Main/>
        </MemoryRouter>
    )
}
render(<App />, document.getElementById('root'));

