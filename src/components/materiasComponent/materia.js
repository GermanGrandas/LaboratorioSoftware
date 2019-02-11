import React,{ Component } from 'react';
import {Segment,Header,Menu,Icon, Dropdown,Grid} from 'semantic-ui-react';

import api from '../../api';
import './index.css';

class Materia extends Component{
    state = {materia : []}

    async componentDidMount(){
        let {user} = this.props;
        if(user === "" | user === undefined){
            user = localStorage.user
            this.setState({user});
            api.materias.getMateria({materiaName : this.props.match.params.id,user}).then(materia=>{
                this.setState({materia});
            });
        }else{
            api.materias.getMateria({materiaName : this.props.match.params.id,user}).then(materia=>{
                this.setState({materia});
            });
        }
    }
    handle =()=>{
        this.props.history.push('/home');
    }
    render(){
        let {logout} = this.props;
        let {materia} = this.state;
        return(
            <div>
                <Segment style={{ height: 100}}  inverted vertical>
                <Menu secondary inverted attached="top">
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
                    content='Docent Helper'
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
                <Segment basic >
                    <Grid >
                        <Grid.Row>
                            <Grid.Column floated='left'>
                                <Icon size='big' onClick={this.handle}
                                    link name='arrow alternate circle left outline'/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row textAlign='center'>
                            <Grid.Column>
                                <Header 
                                    as='h1'
                                    content={materia.nombre}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                           
                        </Grid.Row>
                        
                    </Grid>                
                </Segment>
            </div>
        )
    }
}

export default Materia;


