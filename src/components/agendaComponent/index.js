import React,{Component} from 'react'
import {Card, Icon, List} from 'semantic-ui-react';


import api from '../../api';

import './index.css';

class SchedulerIndex extends Component{
    state = {
        materias : []
    }
    componentDidMount(){
        let {user} = this.props;
        if(user === "" | user === undefined){
            user = localStorage.user
        }
        api.materias.getMaterias(user).then(materiasR=>{
            let {materias} = this.state;
            let x = materiasR.map( (x) =>{
                let materiasDict = {}
                materiasDict['key'] = x['nombre'];
                materiasDict['text'] = x['nombre']
                materiasDict['value'] = x['nombre']
                return materiasDict
            })
            materias.push(x);
            this.setState({materias : materias[0]});
        });
    }
    render(){
        let {materias} = this.state;
        let {handlePlanificador} = this.props;
        return(
            <Card.Content>
                <List size='large' animated selection relaxed divided>
                    {
                        materias.length > 0?
                            materias.map(
                                materia =>(
                                    <List.Item name='planificador' id={materia.text} onClick={handlePlanificador} key={materia.key}>
                                        <Icon name='tag' size='large'/>
                                        <List.Content verticalAlign='middle'>
                                            <List.Header>{`Planificación Materia ${materia.text}`}</List.Header>
                                        </List.Content>
                                    </List.Item>
                                )
                            )
                        :
                        <div></div>
                    }
                </List>
            </Card.Content>
        )
    }
} 


export default SchedulerIndex;

/*
    ({modalOpen,handleItemClick,handleModal,close,user})=> (
    
)
 
    <Modal trigger={<ListItem update={handleModal}/>} open={modalOpen} onClose={close}>
            <Modal.Header>Crear una nueva planificación</Modal.Header>
             <Modal.Content>
                <NewScheduler user={user} closeModal={close}/>
            </Modal.Content>
            </Modal>
            <List.Item name='planificador' onClick={handleItemClick}>
                <Icon name='eye' size='large'/>
                <List.Content verticalAlign='middle'>
                    <List.Header>Ver una planificación</List.Header>
                </List.Content>
        </List.Item>
*/