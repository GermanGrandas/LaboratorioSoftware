import React, {Component} from 'react';
import {Row , Input , Button} from 'react-materialize';

class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email : '',
            password : ''
        }
    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {        
        this.setState({
            [event.target.type] : event.target.value
        });
    }
    
    handleSubmit = event => {
        console.log(this.state);
        event.preventDefault();
        
    }

    render() {
      return (
        <Row className='Login'>
            <Input type="email" s={6} label="Email" value={this.state.email} onChange={this.handleChange}/>
            <Input type="password" label="password" s={6} value={this.state.password} onChange={this.handleChange}/>
            <Button waves='light' onClick={this.handleSubmit} disabled={!this.validateForm()}>Summit</Button>
        </Row>
      )
    };
}

export default Login;