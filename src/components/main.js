import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import TopComponent from './TopComponent';
import HomeComponent from './home';
import RecuperarPage from './recuperarComponent';
import Footer from './FooterComponent';

import axios from 'axios';

const setAuthorizationHeader = (token = null) =>{
    if(token){
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common.Authorization
    }
}
class Main extends Component {
	state = {
		e : "login",
		user : {
			token : null
		},
		message : ""
		
	}

    setMessage = message => this.setState({message});
    login = token =>{
        this.setState({user : {token}});
        localStorage.testToken = token;
        setAuthorizationHeader(token);
	};
	logout = ()=>{
        this.setState({user : {token : null}});
        setAuthorizationHeader();
        localStorage.removeItem('testToken');
    }
    componentDidMount(){
        if(localStorage.testToken){
            this.setState({user: {token : localStorage.testToken} });
            setAuthorizationHeader(localStorage.testToken);
        }
    }
	
	render(){
		return (
			<div>
				<TopComponent />
				{this.state.message && (
                    <div className='card-content white-text'>
                        <i className='mdi-navigation-check' onClick={()=>this.setMessage("")}/>
                        {this.state.message}
                    </div>
                )}
                <Route path='/' exact 
                    render={props => (<HomeComponent {...props} setMessage={this.setMessage}/>)}/>
                
                <Route path='/recuperar' exact component={RecuperarPage}></Route>
            	<Footer />
			</div>
		);
	}
}

export default Main;