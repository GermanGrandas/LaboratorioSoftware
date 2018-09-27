import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './loginForm';
import api from '../api';

class LoginPage extends Component{
    submit = data=> api.users.login(data).then(
        token =>{
            this.props.login(token);
            this.props.setMessage("You have been sucessfully login up");
        });
    render(){
        return(
            <LoginForm submit={this.submit}/>
        )
    }
}
LoginPage.propTypes = {
    login : PropTypes.func.isRequired,
    setMessage : PropTypes.func.isRequired
}

export default LoginPage