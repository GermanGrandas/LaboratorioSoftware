import React, { Component } from 'react';
import {Segment,Header,Grid, Icon,Menu,Button} from 'semantic-ui-react';

import Table from './table';
import api from '../../api';


import './index.css';

class Estudiantes extends Component{
    state = {
        user : '',
        renderAllMaterias : true,
        estudiantes : []
    }
    async componentWillMount(){
        let {user} = localStorage;
        api.estudiantes.getEstudiantes(user).then(estudiantes=>{
            if(!estudiantes.error){
                this.setState({estudiantes});
            }else{
                console.log(estudiantes);
            }
        });
    }

    
    handle2 = ()=>{ this.setState({renderAllMaterias : !this.state.renderAllMaterias})}
    render(){
        let {estudiantes,renderAllMaterias} = this.state;
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
                                                content='Estudiantes'
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Table estudiantes={estudiantes} materia={false}/>
                                    </Grid.Row>                                    
                                </Grid>: <div></div>
                                
                        }                
                        </Segment> : 
                        <div>
                        <Segment style={{ height: 100,backgroundColor:'rgba(140, 79, 61)'}}  inverted vertical>
                        <Menu secondary inverted attached="top">
                            <Menu.Item 
                                position='left'
                            >
                                <Button icon='home' onClick={()=>{this.props.history.push('/home');}} inverted/>
                                     
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
                                    <Grid.Row>
                                        <Table estudiantes={estudiantes} materia={false}/>
                                    </Grid.Row>
                                </Grid>:
                                <div></div>
                        }
                            
                                        
                    </Segment>
                    </div>
                }
                </div> 
            
        )
    }
}


export default Estudiantes;