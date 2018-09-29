import React, { Component } from 'react'
import { Link } from 'react-router-dom';



class Materias extends Component{

    render(){
        return(
            <nav className='orange darken-1'>
                <div className="nav-wrapper">
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to='/' onClick={this.props.logout}>Logout</Link></li>
                </ul>
                </div>
            </nav>
        );
    }
}


export default  Materias;
