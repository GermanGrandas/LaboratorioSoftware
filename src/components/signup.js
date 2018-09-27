import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignupForm from './signupForm';
import api from '../api';

class SignupPage extends Component{
    submit = data =>{
        api.users.create(data).then(()=> {
            this.props.setMessage("You have been sucessfully signed up");
            this.props.history.push("/")});
    };
    render(){
        return(
        <SignupForm submit={this.submit}/>
        )
    }
}
SignupPage.propTypes = {
    setMessage : PropTypes.func.isRequired
}
export default SignupPage;
