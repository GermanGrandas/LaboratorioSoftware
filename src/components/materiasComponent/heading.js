
import React from 'react';
import {Segment,Header,Menu,Icon, Dropdown} from 'semantic-ui-react';

const Heading = ({changeClick,logout})=>(
    <Segment style={{ height: 100}}  inverted vertical>
        <Menu secondary inverted attached="top">
            <Menu.Item onClick={changeClick}>
            <Icon name="sidebar" size='big'/>
            </Menu.Item>
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
        <Header
            as='h1'
            content='DocentHelper'
            textAlign ='center'
            inverted
            style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -80%)',
                fontFamily: "Courgette,Pacifico",
                marginBottom: 0,
            }}
        />
    </Segment>
  )
export default Heading;