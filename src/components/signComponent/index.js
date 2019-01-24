import React, { Component } from 'react';
import SignupForm from './signupForm';
import api from '../../api';
import './index.css';

class SignupPage extends Component{
    state ={
        errors : {}
    }
    submit = data =>{
        api.users.create(data).then(
            token =>{
                if (!token.error) {
                    this.props.update('login');
                } else {
                    this.setState({errors :{error :token.error }});
                }
            });
    };
    render(){
        let {errors} = this.state
        return(
        <SignupForm errors={errors} submit={this.submit}/>
        )
    }
}

export default SignupPage;
