import React, { Component } from 'react';
import SignupForm from './signupForm';
import api from '../api';

class SignupPage extends Component{
    submit = data =>{
        api.users.create(data).then(()=> {
            this.props.history.push('/');
        });
    };
    render(){
        return(
        <SignupForm submit={this.submit}/>
        )
    }
}

export default SignupPage;
