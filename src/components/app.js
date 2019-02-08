import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';

import HomeComponent from './home';
import RecuperarPage from './recuperarComponent';
import AdminRoute from './adminroute';
import Materias from './materiasComponent';
import Materia from './materiasComponent/materia';
import ChangePassword from './resetComponent';
import SpecialRoute from './specialRoute';



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
    login = ({token,user})=>{
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
    async componentWillMount(){
        if(localStorage.testToken){
            this.setState({user : {token: localStorage.testToken,userC : localStorage.user}});
            setAuthorizationHeader(localStorage.testToken);
        }else{
            this.setState({user : {token : null,userC:null}});
        }
    }
	render(){
        let {user} = this.state;
		return (
			<div>
                <SpecialRoute path='/' exact
                    user={this.state.user}
                    render={props => (<HomeComponent {...props} login={this.login}/>)}/>
                
                <Route path='/reset/:token'  
                    render={props => (<ChangePassword {...props}/>)}/>
                <Route path='/recuperar' exact 
                    render={props => (<RecuperarPage {...props} saveToken={this.login}/>)}/>
                    
                <AdminRoute
                    user={this.state.user}
                    path='/materia/:id' render={props => <Materia {...props} user={user.userC} logout={this.logout}/>}/>
                <AdminRoute path='/home' exact
                    user={user}
                    render={props => (<Materias {...props} user={user.userC} logout={this.logout}/>)}/>
               
			</div>
		);
	}
}

export default Main;

/*
    <Route path='/' exact 
                    render={props => (<HomeComponent {...props} login={this.login}/>)}/>

*/