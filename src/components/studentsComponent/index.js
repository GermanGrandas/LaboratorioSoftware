import React from 'react'
import {Card, Icon, List, Modal} from 'semantic-ui-react';

import NewStudent from './newStudent';

const ListItem = ({update})=>(
    <List.Item name='crear' onClick={()=>{
        update();
    }}>
        <Icon name='pencil alternate' size='large'/>
        <List.Content verticalAlign='middle'>
            <List.Header>Crear un Nuevo Estudiante</List.Header>
        </List.Content>
    </List.Item>
);

const StudentIndex = ({modalOpen,handleItemClick,handleModal,close,user})=> (
    <Card.Content>
       <List size='large' animated selection relaxed divided>
            <Modal trigger={<ListItem update={handleModal}/>} open={modalOpen} onClose={close}>
            <Modal.Header>Crear un Nuevo Estudiante</Modal.Header>
             <Modal.Content>
                <NewStudent user={user} closeModal={close}/>
            </Modal.Content>
            </Modal>
            <List.Item name='materias' onClick={handleItemClick}>
                <Icon name='eye' size='large'/>
                <List.Content verticalAlign='middle'>
                    <List.Header>Ver Todos los Estudiantes</List.Header>
                </List.Content>
            </List.Item>
        </List>
    </Card.Content>
)
 


export default StudentIndex;