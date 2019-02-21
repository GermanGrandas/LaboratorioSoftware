import React from 'react'
import {Card, Icon, List, Modal} from 'semantic-ui-react';

import NewScheduler from './newScheduler';

const ListItem = ({update})=>(
    <List.Item name='crear' onClick={()=>{
        update();
    }}>
        <Icon name='pencil alternate' size='large'/>
        <List.Content verticalAlign='middle'>
            <List.Header>Crear una nueva Planificación</List.Header>
        </List.Content>
    </List.Item>
);



const SchedulerIndex = ({modalOpen,handleItemClick,handleModal,close,user})=> (
    <Card.Content>
       <List size='large' animated selection relaxed divided>
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
        </List>
    </Card.Content>
)
 


export default SchedulerIndex;