import React, {Component} from 'react';
import {Row , Input , Button} from 'react-materialize';
import Recaptcha from 'react-recaptcha';


const sitekey='6LdwoGoUAAAAAOIjSUoj1TO5KKeDEt-TBKs2oHXz';
let recaptchaInstance;

class Login extends Component{
    constructor(props) {
        super(props);

        
        this.state = {
            email : '',
            password : '',
            captcha : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checked = this.checked.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.captcha;
    }
    
    resetRecaptcha = () => {
        this.recaptchaInstance.reset();
        this.setState({captcha:false}) 
      };

    handleChange = event => {
        console.log(event.target.name);
           
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    checked = event=>{
        this.setState({captcha:true});
    }

    handleSubmit = event => {
        alert('A name was submitted: ' + this.state.email +' '+ this.state.password);
        this.resetRecaptcha();
        event.preventDefault(); 
    }
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <Row className='Login'>
                <Input name='email' className='input' type="email" s={10}  label="Email" value={this.state.email} onChange={this.handleChange}/>
                <Input name='password' className='input' type="password" label="password" s={10} value={this.state.password} onChange={this.handleChange}/>
                <Recaptcha ref={e => recaptchaInstance = e} className='captcha' s={10} sitekey={sitekey} render="explicit" verifyCallback={this.checked}/>
                <Button className='boton' s={11} waves='light'  disabled={!this.validateForm()}>Sign Up</Button>
            </Row>
            
        </form>
      )
    };
}

export default Login;