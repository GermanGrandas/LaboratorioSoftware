import React,{Component} from "react";
import {Link} from 'react-router-dom';
import {Grid,Segment, Button,Form, Message, Header } from 'semantic-ui-react'

import ReCAPTCHA from 'react-google-recaptcha';
import TopComponent from '../TopComponent';
import Footer from '../footerComponent';
import api from '../../api';

import {captchaDev} from '../../config/config';

class ChangePassword extends Component{
    state = {
        data :{
            password :'',
            confirmPassword : '',
            captcha : true
        },
        loading: false,
		errors: {}
    }

    submit = data=> api.users.cambiar(data).then((params)=>{
        /**token =>{
            if (!token.err) {
                this.props.login(token)
            }*/
            console.log(params);
            //this.props.history.push('/');
        });

    handleStringChange = (e) => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});
    };
    
    handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            console.log('hello ');
			this.submit(this.state.data);
			//alert('UserSaved');.catch(err=> this.setState({errors:err.response.data.errors, loading:false}));
		}
	};
    validate = (data) => {
		const errors = {};
		if (!data.password) errors.password = 'Debe ingresar la Contraseña';
        if (!data.captcha) errors.captcha = 'Debe confirmar el captcha';
        if (data.confirmPassword !== data.password) {
			errors.confirmPassword = 'Las contraseñas no coínciden';
			errors.password = 'Las contraseñas no coínciden';
		}
		return errors;
    };
    onChangeCaptcha = () => {
		this.setState({ data: { ...this.state.data, captcha: true } });
    };
    render(){
		const { data, errors } = this.state;
		let errorsList = [];
		if(Object.keys(errors).length !== 0){
			
			Object.keys(errors).forEach(
				key=> errorsList.push(errors[key]));
		}
        return(
            <div>
                <TopComponent />
                <div style={{ height: 500}} className='login-form'>
				<style>{`
					body > div,
					body > div > div,
					body > div > div > div.login-form {
						height: 100%;
					}
					`}
				</style>
				<Grid textAlign='center' style={{ height: '100%', top : '70%'}} verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 500 }}>
						<Header as='h2' content='Recuperar Contraseña' className="header"/>
						<Form size='large' error={Object.keys(errors).length !== 0 ? true : false} onSubmit={this.handleSubmit}>
							<Segment stacked>
								<Form.Input
									fluid
									icon='lock'
              						iconPosition='left'
									id="password"
									type="password"
									placeholder='Password'
									error={errors.password ? true : false}
									name="password"
									value={data.password}
									onChange={this.handleStringChange}
								/>
                                <Form.Input
									fluid
									icon='lock'
              						iconPosition='left'
									id="confirmPassword"
									type="password"
									placeholder='confirmPassword'
									error={errors.confirmPassword ? true : false}
									name="confirmPassword"
									value={data.confirmPassword}
									onChange={this.handleStringChange}
								/>
								<Form.Field error={errors.captcha ? true : false}>
									<ReCAPTCHA
										ref="recaptcha"
										sitekey={captchaDev}
										onChange={this.onChangeCaptcha}
										className="captcha"
									/>
								</Form.Field >
								{
									Object.keys(errors).length !== 0 ?
									<Message
										error
										header='Se han producido errores'
										list={errorsList}
									/> : <div></div>
								}
                                <Button 
                                    type="submit"
                                    positive
                                >Guardar</Button>
							</Segment>
						</Form>
                        <Message>
							Ha Recordado la Contraseña? <Link to="/">Cancelar</Link>
						</Message>
					</Grid.Column>
				</Grid>
			</div>
            <Footer />
            </div>
        );
    }

}

export default ChangePassword;