import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';

import HomeComponent from './home';
import RecuperarPage from './recuperarComponent';
import AdminRoute from './adminroute';
import Materias from './mainMaterias';
import ChangePassword from './changeForm';

import CrearMateria from './crearMateria';


const setAuthorizationHeader = (token = null) =>{
    if(token){
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common.Authorization;
    }
}
class Main extends Component {
	state = {
        user :{
            token : null
        }
	}
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
    componentWillMount(){
        if(localStorage.testToken){
            this.setState({user : {token: localStorage.testToken}});
            setAuthorizationHeader(localStorage.testToken);
        }else{
            this.setState({user : {token : null}});
        }
    }
	render(){
		return (
			<div>
                <Route path='/' exact 
                    render={props => (<HomeComponent {...props} login={this.login}/>)}/>
                <Route path='/recuperar' exact 
                    render={props => (<RecuperarPage {...props} saveToken={this.login}/>)}/>
                <Route path='/changePassword' exact 
                    render={props => (<ChangePassword {...props}/>)}/>
                    
                <AdminRoute path='/home' exact
                    user={this.state.user}
                    render={props => (<Materias {...props} logout={this.logout}/>)}/>

                <AdminRoute path='/crearMateria' exact
                    user={this.state.user}
                    render={props => (<CrearMateria {...props} logout={this.logout}/>)}/>
			</div>
		);
	}
}

export default Main;