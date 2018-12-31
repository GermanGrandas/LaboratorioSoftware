import React, { Component } from 'react'
import {Segment,Header,Grid, Card} from 'semantic-ui-react';

import NewMat from './nuevaMateria';

import api from '../../api';

class Materias extends Component{
    state = {
        user : '',
        materias : []
    }
    componentDidUpdate(prevProps){
		if(prevProps.user !== this.props.user){
			this.setState({user : this.props.user});
		}
	}
    componentDidMount(){
        let {user} = this.props;
        this.setState({user});
        api.materias.getMaterias(user).then(data=>{
            let materias = data.map((i)=>{
                let materiasDict = {}    
                materiasDict['header'] = i.nombre
                materiasDict['description'] = `${i.codigo}-${i.institucion}, Rango de fechas: ${i.datesRange}`
                materiasDict['meta'] =  `${i.dias} - ${i.hInicio}-${i.hFin}`
                return materiasDict
            })
            this.setState({materias});
        });
    }

    render(){
        let {materias} = this.state;
        let {user} = this.props
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
                            <NewMat user={user}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Card.Group items={materias}/>
                    </Grid.Row>
                </Grid>                
            </Segment>
        )
    }
}


export default Materias;