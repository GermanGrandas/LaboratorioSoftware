
import React, { Component } from 'react'
import {Segment,Menu,Header,Sidebar, Card, Grid,Icon, List, Modal} from 'semantic-ui-react';

import TopHeader from './heading';
import MainMaterias from  './materias';
import NewMat from './nuevaMateria';

const ListItem = ({update})=>(
    <List.Item name='crear' onClick={()=>{
        update();
    }}>
        <Icon name='pencil alternate' size='normal'/>
        <List.Content verticalAlign='middle'>
            <List.Header>Crear una Nueva Materia</List.Header>
        </List.Content>
    </List.Item>
);

class Materias extends Component{
    state = { menuVisible: false , activeItem : 'home',modalOpen: false,user :null}

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
  handleItem = name =>{
      let {activeItem} = this.state
      if(name === 'back'){
        this.setState({ activeItem: 'home' })
      }else{
        this.setState({ activeItem})
      }
  }
  handleModal = () => this.setState({ modalOpen: true })
  close = ()=> this.setState({modalOpen : false})
  render() {
    const { menuVisible,activeItem,modalOpen } = this.state
    const { logout} = this.props;
    let {user } = localStorage;
    return (
        <div className='bodyMaterias'>
        <TopHeader changeClick={this.handleClick} logout={logout}/>
        <Sidebar.Pushable as={Segment} style={{backgroundColor:'rgba(235, 235, 235, 0.5)'}}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            vertical
            visible={menuVisible}
            width='thin'
            pointing
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
                                        <Card style={{height : 400, width : 500}}>
                                            <Header as='h3' icon style={{margin : '10 0',padding: 30}}>
                                                <Icon name='book' circular size='tiny'/>
                                                <Header.Content>Materias</Header.Content>
                                            </Header>
                                            <Card.Content>
                                                <List size='large' animated selection relaxed divided>
                                                    <Modal trigger={<ListItem update={this.handleModal}/>} open={modalOpen} onClose={this.close}>
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
                                        <Card style={{height : 400, width : 500}}>
                                            <Header as='h3' icon style={{margin : '10 0', padding: 30,}}>
                                                <Icon name='group' circular size='tiny'/>
                                                <Header.Content>Estudiantes</Header.Content>
                                            </Header>
                                        </Card>
                                    </Card.Group>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        
                         : activeItem === 'materias' ?
                            <Segment vertical style={{height : 500}} >
                                <MainMaterias user={user} handle={this.handleItem}/>
                            </Segment >    : 
                        activeItem === 'estudiantes' ?
                            <Segment vertical style={{height : 500}}>
                                <Grid>
                                    <Grid.Row>
                                    <Grid.Column textAlign='center'>
                                        <Header 
                                            as='h1'
                                            content='Estudiantes'
                                        />
                                    </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                         : <div></div>

                }
            </Segment>
            
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
    }
}


export default  Materias;