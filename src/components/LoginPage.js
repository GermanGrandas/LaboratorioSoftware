import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './loginForm';
import api from '../api';

class LoginPage extends Component{
    submit = data=> api.users.login(data).then(
        token =>{
            if (!token.err) {
                this.props.login(token)
                this.props.history.push('/home');
            } else {
                this.props.history.push('/');
            }
        });

    render(){
        return(
            <LoginForm submit={this.submit}/>
        )
    }
}
LoginPage.propTypes = {
    login : PropTypes.func.isRequired,
    history : PropTypes.object.isRequired
}

export default LoginPage