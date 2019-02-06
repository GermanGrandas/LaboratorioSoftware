import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter} from "react-router-dom";

import 'semantic-ui-css/semantic.css';

import Main from './components/app'

const App = ()=>{
    return (
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    )
}
render(<App />, document.getElementById('root'));
