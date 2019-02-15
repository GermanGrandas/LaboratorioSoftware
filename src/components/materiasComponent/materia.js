import React,{ Component } from 'react';
import {Segment,Header,Menu,Icon, Button,Grid,Table as Tabla} from 'semantic-ui-react';

import Table  from '../studentsComponent/table';
import api from '../../api';
import './index.css';

class Materia extends Component{
    state = {materia : [],estudiantes : []}

    componentDidMount(){
        let {user} = localStorage;
            api.materias.getMateria({materiaName : this.props.match.params.id,user}).then(materia=>{
                this.setState({materia});
            });
    }
    handle =()=>{
        this.props.history.push('/materias');
    }
    keysMap = (materia,keys) =>(
        
                <Tabla.Header>
                    <Tabla.Row>
                        {
                        keys.map( (x) =>{
                            let item = undefined;
                            if(!(x === 'estudiantes' | x === '__v' | materia[x] === '')){
                                item = <Tabla.HeaderCell key={x}>{x}</Tabla.HeaderCell>
                            }
                            return item
                        })
                    }
                </Tabla.Row>
            </Tabla.Header>
        )
    
    itemsMap = (item) =>(
        <Tabla.Body>
            <Tabla.Row>
            {
                item.map(x=>(
                    <Tabla.Cell key={x}>{x}</Tabla.Cell>
                ))
            }
            </Tabla.Row>
        </Tabla.Body>
        
    )
    tableMap = materia =>{
        let keys = Object.keys(materia);
        let values = Object.values(materia);
        delete values[0]
        delete values[10]
        delete values[11]
        return(
            <Tabla>
                {this.keysMap(materia,keys)}
                {this.itemsMap(values)}
            </Tabla>
    )}
    render(){
        let {logout} = this.props;
        let {materia} = this.state;
        let estudiantes = materia.estudiantes;
        return(
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
                            {this.tableMap(materia)}
                        </Grid.Row>
                        
                        <Grid.Row textAlign='center'>
                            <Grid.Column>
                                <Header 
                                    as='h2'
                                    content={'Estudiantes'}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Table estudiantes={estudiantes} materia/>
                        </Grid.Row>
                    </Grid>                
                </Segment>
            </div>
        )
    }
}

export default Materia;


