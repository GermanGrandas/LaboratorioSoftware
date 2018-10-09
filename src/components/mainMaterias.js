import React, { Component } from 'react'
import Menu from './sideMenu';

class Materias extends Component{
    render(){
        return(
            <div id='App'>            
                <Menu pageWrapId={"page-wrap"} outerContainerId={"App"} logout={this.props.logout}/>
                <div className='nav-wrapper white' id="page-wrap">
                    <h1>Docent Helper</h1>
                    <div className='section'>
                	</div> 
				</div>
            </div>
        );
    }
}


export default  Materias;
