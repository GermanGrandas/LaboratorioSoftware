import React, { Component } from 'react';
import {Segment,Header,Grid, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import api from '../../api';
import './index.css';

const colors = ['#372734','#36B4E1','#DB933A','#FDD654','#F4682D','#F0CC05','#F3E8CC','#021A5A','#0539A6']
class Materias extends Component{
    state = {
        user : '',
        materias : []
    }
    async componentWillMount(){
        let {user} = this.props;
        if(user === "" | user === undefined){
            user = localStorage.user
            this.setState({user});
            api.materias.getMaterias(user).then(materias=>{
                this.setState({materias});
            });
        }else{
            api.materias.getMaterias(user).then(materias=>{
                this.setState({materias});
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
        return materias.map(item =>{
            let color = colors[Math.floor(Math.random() * colors.length)];
            return(
                <Link to={`/materia/${item.nombre}` } key={item.codigo} className="materia_item">
                    <Segment compact inverted style={{backgroundColor : color}} className='box'>
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
    render(){
        let {materias} = this.state;
        let {handle} = this.props;
        return(
            <Segment basic >
                <Grid>
                    <Grid.Row>
                        <Grid.Column floated='left'>
                            <Icon size='big' onClick={()=>{handle('back');}}
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
                </Grid>                
            </Segment>
        )
    }
}


export default Materias;

/*
    <Grid.Row>
        <Card.Group items={materias}/>
    </Grid.Row>
*/
