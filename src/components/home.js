import React, {Component} from 'react';
import {Segment, List, Grid} from 'semantic-ui-react';
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
                    <Grid stackable columns={2}>
                        <Grid.Row >
                            <Grid.Column floated='right' style={{padding:20}}>
                                <List link  horizontal size='massive'>
                                    <List.Item as={Link} name='login' to='#' onClick={this.update}>Ingresar</List.Item>
                                    <List.Item as={Link} name='sign' to='#' onClick={this.update}>Registrarse</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered className='homeContainer'>
        
                                {
                                    this.state.e ==='login' ? <Login history={this.props.history} login={this.props.login}/> : <Sign update={this.updateS} history={this.props.history}/>
                                }
                       
                            
                        </Grid.Row>
                    </Grid>
                    
                </Segment>
                <FooterComp/>
            </Segment>
        )
    }
}

export default App;
