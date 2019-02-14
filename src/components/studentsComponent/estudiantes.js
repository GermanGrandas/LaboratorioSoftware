import React, { Component } from 'react';
import {Segment,Header,Grid, Icon,Menu,Dropdown} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import api from '../../api';
import Materia from '../materiasComponent/materia';

import './index.css';

class Estudiantes extends Component{
    state = {
        user : '',
        renderAllMaterias : true,
        materias : []
    }
    async componentWillMount(){
        let {user} = this.props;
        if(user === "" | user === undefined){
            user = localStorage.user
            this.setState({user});
            api.materias.getMaterias(user).then(materias=>{
                if(!materias.error){
                    this.setState({materias});
                }else{
                    console.log(materias);
                }
            });
        }else{
            api.materias.getMaterias(user).then(materias=>{
                if(!materias.error){
                    this.setState({materias});
                }else{
                    console.log(materias);
                }
                
                
            });
        }
    }
    update = ()=>{
        let {user} = this.props;
        if(user === "" | user === undefined){
            user = localStorage.user
        }
        api.materias.getMaterias(user).then(materias=>{
            this.setState({materias});
        });
    }
    renderList = materias =>{
        if(materias.length === 0){
            return (
                <div></div>
            )
        }else{
            return materias.map(item =>{
                return(
                    <Link to={`/materia/${item.nombre}` } key={item.codigo} className="materia_item">
                        <Segment compact inverted className='box'>
                            <Header 
                                as='h3'
                                content={item.nombre}
                                textAlign='center'
                            />
                        </Segment>
                    </Link>
                )
            })
        }
        
    }
    handle2 = ()=>{ this.setState({renderAllMaterias : !this.state.renderAllMaterias})}
    render(){
        let {materias,renderAllMaterias} = this.state;
        let {handle,logout,item} = this.props;
        return(
            <div>
                {   
                
                    item ? 
                        <Segment basic>
                        {
                            renderAllMaterias ?
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column floated='left'>
                                            <Icon size='big' onClick={handle ? ()=>{handle('back');} : ()=>{this.props.history.push('/home');}}
                                                link name='arrow alternate circle left outline'/>
                                        </Grid.Column>                        
                                    </Grid.Row>
                                    <Grid.Row textAlign='center'>
                                        <Grid.Column>
                                            <Header 
                                                as='h1'
                                                content='Materias'
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className="materias_container">
                                        {this.renderList(materias)}
                                    </Grid.Row>
                                </Grid>:
                                <Materia handleChange={this.handle2}/>
                        }                
                        </Segment> : 
                        <div>
                        <Segment style={{ height: 100,backgroundColor:'rgba(140, 79, 61)'}}  inverted vertical>
                        <Menu secondary inverted attached="top">
                            <div className='headerContainer'>
                                <img class='logoHome' src={'../images/logo_docent.png'} alt='Logo DocentHelper' />
                                <h2>DocentHelper</h2>
                            </div>
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
                        <Segment basic >
                        {
                            renderAllMaterias ?
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column floated='left'>
                                            <Icon size='big' onClick={handle ? ()=>{handle('back');} : ()=>{this.props.history.push('/home');}}
                                                link name='arrow alternate circle left outline'/>
                                        </Grid.Column>                        
                                    </Grid.Row>
                                    <Grid.Row textAlign='center'>
                                        <Grid.Column>
                                            <Header 
                                                as='h1'
                                                content='Estudiantes'
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className="materias_container">
                                        {this.renderList(materias)}
                                    </Grid.Row>
                                </Grid>:
                                <Materia handleChange={this.handle2}/>
                        }
                            
                                        
                    </Segment>
                    </div>
                }
                </div> 
            
        )
    }
}


export default Estudiantes;