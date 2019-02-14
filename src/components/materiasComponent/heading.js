
import React from 'react';
import {Segment,Menu,Icon, Dropdown} from 'semantic-ui-react';

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
            <Icon name="sidebar" size='normal'/>
            </Menu.Item>
            <div className='headerContainer'>
            <img class='logoHome' src={'../images/logo_docent.png'} alt='Logo DocentHelper' />
            <h2>DocentHelper</h2>
            </div>
            <Menu.Menu position='right' style={{flex:'none'}}>           
                <Dropdown item icon='user' size='normal' simple>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            Configuración
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logout}>
                            Salir
                        </Dropdown.Item>
                    </Dropdown.Menu>    
                </Dropdown>
            </Menu.Menu>         
        </Menu>
    </Segment>
    </div>
  )
export default Heading;