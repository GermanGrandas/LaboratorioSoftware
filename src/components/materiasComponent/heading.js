
import React from 'react';
import {Segment,Header,Menu,Icon, Dropdown} from 'semantic-ui-react';

const Heading = ({changeClick,logout})=>(
    <header>
    <Segment style={{ position:'fixed', zIndex:'10', width:'100vw'}}  inverted vertical>
        <Menu secondary inverted attached="top">
            <Menu.Item onClick={changeClick}>
            <Icon name="sidebar" size='big'/>
            </Menu.Item>
            <Header
                as='h1'
                content='DocentHelper'
                textAlign ='center'
                inverted
                style={{
                    
                    fontFamily: "Courgette,Pacifico",
                    marginBottom: 0,
                }}
            />
            <Menu.Menu position='right'>           
                <Dropdown item icon='user' size='big' simple>
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
    </header>
  )
export default Heading;