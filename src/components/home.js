<<<<<<< HEAD
import React, {Component} from 'react';
import {Segment, List} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import TopComp from './TopComponent';
import FooterComp from './footerComponent';
import Login from './loginComponent';
import Sign from './signComponent';
import './app.css';


class App extends Component{
    state = {
		e : "login"
	}
	update = (e)=>{        
        this.setState({e : e.target.name});
	}
    render(){
        return(
            <Segment vertical>
                <TopComp/>
                <Segment vertical 
                    style={{
                        height: this.state.e ==='login' ? 600 : 700,}}
                >
                    <div style={{padding:20}}>
                        <List link horizontal floated='right' size='massive'>
                            <List.Item as={Link} name='login' to='#' onClick={this.update}>Ingresar</List.Item>
                            <List.Item as={Link} name='sign' to='#' onClick={this.update}>Registrarse</List.Item>
                        </List>
                    </div>
                    {
							this.state.e ==='login' ? <Login history={this.props.history} login={this.props.login}/> : <Sign history={this.props.history}/>
					}
                </Segment>
                <FooterComp/>
            </Segment>
        )
    }
}

export default App;
=======
import React, {Component} from 'react';
import {Segment, List} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import TopComp from './TopComponent';
import FooterComp from './footerComponent';
import Login from './loginComponent';
import Sign from './signComponent';
import './app.css';


class App extends Component{
    state = {
		e : "login"
	}
	update = (e)=>{        
        this.setState({e : e.target.name});
    }
    updateS = (e)=>{        
        this.setState({e});
	}
    render(){
        return(
            <Segment vertical>
                <TopComp/>
                <Segment vertical 
                    style={{
                        height: this.state.e ==='login' ? 600 : 900,}}
                >
                    <div style={{padding:20}}>
                        <List link horizontal floated='right' size='massive'>
                            <List.Item as={Link} name='login' to='#' onClick={this.update}>Ingresar</List.Item>
                            <List.Item as={Link} name='sign' to='#' onClick={this.update}>Registrarse</List.Item>
                        </List>
                    </div>
                    {
							this.state.e ==='login' ? <Login history={this.props.history} login={this.props.login}/> : <Sign update={this.updateS} history={this.props.history}/>
					}
                </Segment>
                <FooterComp/>
            </Segment>
        )
    }
}

export default App;
>>>>>>> 27b7508179506cc05b95b3e46051d0a766d1ee64
