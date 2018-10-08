import React, { Component } from 'react'
import Menu from './sideMenu';

class Materias extends Component{
    render(){
        return(
            <div>
                <div id='App'>            
                    <Menu pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                    <div className='nav-wrapper white' id="page-wrap">
                        <h1>Docent Helper</h1>
                    </div>
                    <div className='section'>
                            hi
                    </div>
                </div>
            </div>
            
        );
    }
}


export default  Materias;
