import React, {Component} from 'react';
import {Segment, List, Grid} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import TopComp from './TopComponent';
import FooterComp from './footerComponent';
import Login from './loginComponent';
import Sign from './signComponent';
import './reset.css'
import './app.css';


class App extends Component{
    state = {
        e : "login"
    }
    update = (e)=>{        
        this.setState({e : e.target.name});
    }
    updateS = (e)=>{        
        this.setState({e});
    }
    render(){
        return(
            <Segment vertical>
                <TopComp/>
                <main>
                <div class='descripcion'>
                Ingresa ya a DocentHelper y haz uso de todos los beneficios que tenemos para ofrecerte en la administración de tus materias.
                <br /><br />
                <ul>
                    <li>Administra tus cursos más facilmente</li>
                    <li>Establece tu cronograma</li>
                    <li>Orgaiza el contenido de tus materias</li>
                    <li>Haz informes de grupos con facilidad</li>
                    <li>Lleva un orden de asistencia</li>
                </ul>
                </div>
                <Segment vertical>   
                    <Grid stackable columns={2}>
                        <Grid.Row >
                            <Grid.Column className='nav'>
                                <List className='list-nav'>
                                    <List.Item as={Link} name='login' to='#' onClick={this.update} style={{color:'rgba(88, 76, 54)'}} className='list-item'>Ingresar</List.Item>
                                    <List.Item as={Link} name='sign' to='#' onClick={this.update} style={{color:'rgba(88, 76, 54)'}} className='list-item'>Registrarse</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered className='homeContainer'>
        
                                {
                                    this.state.e ==='login' ? <Login history={this.props.history} login={this.props.login}/> : <Sign update={this.updateS} history={this.props.history}/>
                                }
                       
                            
                        </Grid.Row>
                    </Grid>
                    
                </Segment>
                </main>
                <FooterComp/>
            </Segment>
        )
    }
}

export default App;
