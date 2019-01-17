import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './loginForm';
import api from '../../api';

class LoginPage extends Component{
    state ={
        errors : {}
    }
    submit = data=> api.users.login(data).then(
        token =>{
            if (!token.error) {
                this.props.login(token);
                this.props.history.push('/home');
            } else {
                this.setState({errors : token.error});
            }
        });

    render(){
        let {errors} = this.state
        return(
            <LoginForm errors={errors} submit={this.submit}/>
        )
    }
}
LoginPage.propTypes = {
    login : PropTypes.func.isRequired,
    history : PropTypes.object.isRequired
}

export default LoginPage