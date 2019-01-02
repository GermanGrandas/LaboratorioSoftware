import React from 'react'
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'

//o
const MainMenu = props =>{
    return(
        <Menu {...props} >
            <Link to='/home' className="menu-item">Home</Link>
            <Link to='/crearMateria' className="menu-item">Materias</Link>
            <Link to='/' className="menu-item">Estudiantes</Link>
            <Link to='/' className="menu-item">Informes</Link> 
            <Link to='#' className="menu-item" onClick={props.logout}>Logout</Link>
        </Menu>
    )
}

export default MainMenu;