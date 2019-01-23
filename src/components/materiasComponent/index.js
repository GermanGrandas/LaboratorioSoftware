
import React, { Component } from 'react'
import {Segment,Menu,Header,Sidebar, Divider, Grid} from 'semantic-ui-react';

import TopHeader from './heading';
import MainMaterias from  './materias';

class Materias extends Component{
    state = { menuVisible: false , activeItem : 'home'}

  handleClick = () => {
        this.setState({ menuVisible: !this.state.menuVisible })
    }
  handleClick2 = () => {
        this.setState({ menuVisible: false })
    }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { menuVisible,activeItem } = this.state
    const { logout, user} = this.props
    return (
        <div>
        <TopHeader changeClick={this.handleClick} logout={logout}/>
        <Sidebar.Pushable as={Segment}>
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
            <Segment basic style={{margin : '0 0'}}>
                {
                    activeItem === 'home' ?
                        <div>
                            <Segment vertical >
                                <MainMaterias user={user}/>
                            </Segment >
                            <Divider />
                            <Segment vertical>
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
                        </div>
                        
                         : activeItem === 'materias' ?
                            <Segment vertical style={{height : 500}} >
                                <MainMaterias user={user}/>
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