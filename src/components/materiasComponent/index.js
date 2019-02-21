
import React, { Component } from 'react'
import {Segment,Menu,Header,Sidebar, Card, Grid,Icon, List, Modal} from 'semantic-ui-react';

import TopHeader from './heading';
import MainMaterias from  './materias';
import NewMat from './nuevaMateria';
import Student from '../studentsComponent';
import Estudiantes from '../studentsComponent/estudiantes';
import Scheduler from '../agendaComponent';
import VerAgenda from '../agendaComponent/verAgenda';

const ListItem = ({update})=>(
    <List.Item name='crear' onClick={()=>{
        update();
    }}>
        <Icon name='pencil alternate' size='large'/>
        <List.Content verticalAlign='middle'>
            <List.Header>Crear una Nueva Materia</List.Header>
        </List.Content>
    </List.Item>
);


class Materias extends Component{
    state = { menuVisible: false , activeItem : 'home',modalOpenM: false,modalOpenE: false,modalOpenS: false,user :null}

    async componentDidMount(){
        let {user} = localStorage;
        this.setState({user});
    }
  handleClick = () => {
        this.setState({ menuVisible: !this.state.menuVisible })
    }
  handleClick2 = () => {
        this.setState({ menuVisible: false })
    }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleEstudiantesClick = ()=>{this.props.history.push(`/estudiantes`);}
  handleItem = name =>{
      let {activeItem} = this.state
      if(name === 'back'){
        this.setState({ activeItem: 'home' })
      }else{
        this.setState({ activeItem})
      }
  }
  handleModalM = () => this.setState({ modalOpenM: true })
  handleModalE = () => this.setState({ modalOpenE: true })
  handleModalS = () => this.setState({ modalOpenS: true })

  close = ()=> this.setState({modalOpenM : false,modalOpenE : false,modalOpenS : false})
  render() {
    const { menuVisible,activeItem,modalOpenM, modalOpenE,modalOpenS } = this.state
    const { logout} = this.props;
    let {user } = localStorage;
    return (
        <div className='bodyMaterias'>
        <TopHeader changeClick={this.handleClick} logout={logout}/>
        <Sidebar.Pushable as={Segment} style={{display:'block', backgroundColor:'rgba(233, 233, 233)'}}>
          <Sidebar
            as={Menu}
            icon='labeled'
            vertical
            visible={menuVisible}
            width='thin'
            pointing
            style={{backgroundColor:'rgba(233, 233, 233)'}}
          >
            <Menu.Item 
                name='home'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
                icon='home'
            />
            <Menu.Item 
                name='materias'
                active={activeItem === 'materias'}
                onClick={this.handleItemClick}
                icon='book'
            />
            <Menu.Item 
                name='estudiantes'
                active={activeItem === 'estudiantes'}
                onClick={this.handleItemClick}
                icon='student'
            />
          </Sidebar>
          <Sidebar.Pusher dimmed={menuVisible} onClick={this.handleClick2}>
            <Segment basic style={{backgroundColor:'rgba(233, 233, 233)'}}>
                {
                    activeItem === 'home' ?
                        <Segment style={{backgroundColor:'rgba(233, 233, 233)'}}>
                            <Grid centered>
                                <Grid.Row verticalAlign='middle'>
                                    <Header 
                                        as='h2'
                                        content={`Bienvenido ${user}`}
                                    />
                                </Grid.Row>
                                <Grid.Row>
                                    <Card.Group centered>
                                        <Card className='card'>
                                            <Header as='h3' icon style={{margin : '10 0',padding: 30}}>
                                                <Icon name='book' size='big'/>
                                                <Header.Content>Materias</Header.Content>
                                            </Header>
                                            <Card.Content>
                                                <List size='large' animated selection relaxed divided>
                                                    <Modal trigger={<ListItem update={this.handleModalM}/>} open={modalOpenM} onClose={this.close}>
                                                    <Modal.Header>Crear una Nueva Materia</Modal.Header>
                                                    <Modal.Content>
                                                        <NewMat user={user} closeModal={this.close}/>
                                                    </Modal.Content>
                                                    </Modal>
                                                    <List.Item name='materias' onClick={this.handleItemClick}>
                                                        <Icon name='eye' size='large'/>
                                                        <List.Content verticalAlign='middle'>
                                                            <List.Header>Ver Todas las Materias</List.Header>
                                                        </List.Content>
                                                    </List.Item>
                                                </List>
                                            </Card.Content>
                                        </Card>
                                        <Card className='card'>
                                            <Header as='h3' icon style={{margin : '10 0', padding: 30,}}>
                                                <Icon name='group' size='big'/>
                                                <Header.Content>Estudiantes</Header.Content>
                                            </Header>
                                            <Student modalOpen={modalOpenE} handleItemClick={this.handleEstudiantesClick} handleModal={this.handleModalE} close={this.close} user={user}/>
                                            
                                        </Card>
                                        <Card className='card'>
                                            <Header as='h3' icon style={{margin : '10 0', padding: 30,}}>
                                                <Icon name='tags' size='big'/>
                                                <Header.Content>Planificador</Header.Content>
                                                <Scheduler modalOpen={modalOpenS} handleItemClick={this.handleItemClick} handleModal={this.handleModalS} close={this.close} user={user}/>
                                            </Header>
                                        </Card>
                                    </Card.Group>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        
                         : activeItem === 'materias' ?
                            <Segment vertical style={{height : '80vh', overflow : 'hidden'}}>
                                <MainMaterias user={user} item={activeItem} handle={this.handleItem}/>
                            </Segment >    : 
                        activeItem === 'estudiantes' ?
                            <Segment vertical style={{height : '80vh',overflow : 'hidden'}}>
                                <Estudiantes user={user} item={activeItem} handle={this.handleItem}/>
                            </Segment>
                         : activeItem === 'planificador' ?
                            <Segment vertical style={{height : '80vh',overflow : 'hidden'}}>
                                <VerAgenda user={user} item={activeItem} handle={this.handleItem}/>
                            </Segment>
                         :<div></div>

                }
            </Segment>
            
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
    }
}


export default  Materias;