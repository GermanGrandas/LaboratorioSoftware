import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';

import HomeComponent from './home';
import RecuperarPage from './recuperarComponent';
import AdminRoute from './adminroute';
import Materias from './materiasComponent';
import ChangePassword from './resetComponent';

//import CrearMateria from './crearMateria';


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
            token : null,
            userC : null
        }
	}
    login = ({token,user} )=>{
        this.setState({user : {token, user}});
        localStorage.testToken = token;
        localStorage.user = user;
        setAuthorizationHeader(token);
	};
	logout = ()=>{
        this.setState({user : {token : null, userC : null}});
        setAuthorizationHeader();
        localStorage.removeItem('testToken');
        localStorage.removeItem('user');
    }
    componentWillMount(){
        if(localStorage.testToken){
            this.setState({user : {token: localStorage.testToken,userC : localStorage.user}});
            setAuthorizationHeader(localStorage.testToken);
        }else{
            this.setState({user : {token : null,userC:null}});
        }
    }
	render(){
		return (
			<div>
                <Route path='/' exact 
                    render={props => (<HomeComponent {...props} login={this.login}/>)}/>
                <Route path='/reset/:token'  
                    render={props => (<ChangePassword {...props}/>)}/>
                <Route path='/recuperar' exact 
                    render={props => (<RecuperarPage {...props} saveToken={this.login}/>)}/>
                <AdminRoute path='/home' exact
                    user={this.state.user}
                    render={props => (<Materias {...props} user={this.state.user.userC} logout={this.logout}/>)}/>
			</div>
		);
	}
}

export default Main;

/*
    <Route path='/recuperar' exact 
                    render={props => (<RecuperarPage {...props} saveToken={this.login}/>)}/>
                <Route path='/changePassword' exact 
                    render={props => (<ChangePassword {...props}/>)}/>
                    
                

                <AdminRoute path='/crearMateria' exact
                    user={this.state.user}
                    render={props => (<CrearMateria {...props} user={this.state.user.userC} logout={this.logout}/>)}/>


                    */
                   