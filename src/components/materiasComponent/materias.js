import React, { Component } from 'react'
import {Segment,Header,Grid, Card} from 'semantic-ui-react';

import NewMat from './nuevaMateria';

import api from '../../api';

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
        api.materias.getMaterias(user).then(materias=>{
            this.setState({materias});
        });
    }

    columns = materias=>{
        if(materias.length === 0){
            return(
                <div></div>
            )}else{
                return(
                    materias.map((i,e)=>(
                        <Grid.Column key={e} >
                            <Card>
                                <Card.Content>
                                    <Card.Header>{i.nombre}</Card.Header>
                                    <Card.Meta>
                                        <span>{i.dias}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        <span>{i.hInicio}-{i.hFin}</span>
                                    </Card.Description>
                                
                                    <span style={{display: 'inline-block'}}> Código: {i.codigo}<br />{i.institucion}</span>.
                                </Card.Content>
                                <Card.Content extra>
                                    <span style={{display: 'inline-block'}}>Rango de fechas:<br /> {i.datesRange}</span>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
    )))}};
    renderList = materias =>{
        let rowsNumber = Math.trunc(materias.length / 5);
        let rowsList = [];
        for (let index = 0; index <= rowsNumber; index++) {
            rowsList.push(
                <Grid.Row key={index} columns='equal'>
                    {this.columns(materias.slice(index*5+0,(index+1)*5))}
                </Grid.Row>
            )
        }
        return(rowsList)
    }
    render(){
        let {materias} = this.state;
        let {user} = this.props;
        const rows = this.renderList(materias);
        return(
            <Segment basic >
                <Grid>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <Header 
                                as='h1'
                                content='Materias'
                            />
                        </Grid.Column>
                        <Grid.Column floated='right'>
                            <NewMat user={user} update={this.update}/>
                        </Grid.Column>
                    </Grid.Row>
                    {rows}
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
