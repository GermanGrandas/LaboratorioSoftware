
import React from 'react';
import {Segment,Menu,Icon, Button} from 'semantic-ui-react';

const Heading = ({changeClick,logout})=>(
    <div className='headerHome'>
    <Segment style={{
            display:'block',
            width:'100vw',
            maxWidth:'150em',
            padding:'1em',
            backgroundColor:'rgba(140, 79, 61)'
        }} inverted vertical>
        <Menu secondary inverted attached="top" style={{display:'flex'}}>
            <Menu.Item onClick={changeClick} style={{flex:'none'}}>
            <Icon name="sidebar" size='big'/>
            </Menu.Item>
            <div className='headerContainer'>
            <img className='logoHome' src={'../images/logo_docent.png'} alt='Logo DocentHelper' />
            <h2>DocentHelper</h2>
            </div>
            <Menu.Item
                position='right'
            >
                <Button content='Salir' onClick={logout} inverted/>
        </Menu.Item>   
        </Menu>
    </Segment>
    </div>
  )
export default Heading;

/*
        <Dropdown.Item>
            Configuración
        </Dropdown.Item>
*/