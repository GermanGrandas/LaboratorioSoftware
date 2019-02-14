import React,{ Component } from 'react';
import {Segment,Header,Menu,Icon, Dropdown,Grid,Table} from 'semantic-ui-react';

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
        this.props.history.push('/materias');
    }
    keysMap = materia =>{
        let keys = Object.keys(materia);
        let values = Object.values(materia);
        console.log(keys);
        console.log(materia['grado']);
        
        return(
            <div>
                <Table.Header>
                    <Table.Row>
                        {
                            keys.map( (x) =>{
                                //console.log(x);
                                
                                let item = x === 'estudiantes' | materia['grado'] === '' | materia['universidad'] === '' ?
                                <div></div> : <Table.HeaderCell key={x+'i'}>{x}</Table.HeaderCell>
                                return item
                            })
                        }
                    </Table.Row>
                </Table.Header>
            </div>
            
        )
    }
    itemsMap = (item,i) =>(
        <Table.Row>
            {
                item.map(x=>(
                    <Table.Cell key={x}>{x}</Table.Cell>
                ))
            }
        </Table.Row>
    )
    tableMap = materia =>(
        <Table>
            {this.keysMap(materia)}
        </Table>
    )
    render(){
        let {logout} = this.props;
        let {materia} = this.state;
        console.log(materia);
        delete materia['_id']
        delete materia['creator']
        console.log(materia);
        return(
            <div>
                <Segment style={{ height: 100,backgroundColor:'rgba(140, 79, 61)'}}  inverted vertical>
                <Menu secondary inverted attached="top">
                    <div className='headerContainer'>
                        <img className='logoHome' src={'../images/logo_docent.png'} alt='Logo DocentHelper' />
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
                            {this.tableMap(materia)}
                        <Grid.Row>
                            <Grid.Column>
                            </Grid.Column>   
                        </Grid.Row>
                        <Grid.Row textAlign='center'>
                            <Grid.Column>
                                <Header 
                                    as='h2'
                                    content={'Estudiantes'}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        
                    </Grid>                
                </Segment>
            </div>
        )
    }
}

export default Materia;


