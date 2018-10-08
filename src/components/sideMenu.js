import React from 'react'
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'

//onClick={this.props.logout}
const MainMenu = props =>{
    return(
        <Menu {...props} >
            <Link to='/' className="menu-item">Materias</Link>
            <Link to='/' className="menu-item">Materias2</Link> 
            <Link to='/' className="menu-item">Logout</Link>
        </Menu>
    )
}

export default MainMenu;