
import React, { Component } from 'react'
import {Segment,Menu,Header,Sidebar} from 'semantic-ui-react';

import TopHeader from './heading';

class Materias extends Component{
    state = { menuVisible: false , activeItem : 'home'}

  handleClick = () => this.setState({ menuVisible: !this.state.menuVisible })
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { menuVisible,activeItem } = this.state
    const { logout} = this.props
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

          <Sidebar.Pusher dimmed={menuVisible} onClick={this.handleClick} style={{margin : '0 0'}}>
            <Segment basic style={{margin : '0 0', height : 500}}>
                {
                    activeItem === 'home' ?
                        <Header 
                            as='h1'
                            content='puto'
                            textAlign='center'
                        /> : activeItem === 'materias' ?
                        <Header 
                            as='h1'
                            content='puto2'
                            textAlign='center'
                        /> : activeItem === 'estudiantes' ?
                        <Header 
                            as='h1'
                            content='puto3'
                            textAlign='center'
                        /> : <div></div>

                }
            </Segment>
            
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
    }
}


export default  Materias;