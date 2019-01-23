import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import {Grid,Segment, Button,Form, Message, Header } from 'semantic-ui-react'
//import FormInlineMessage from './FormInlineMessage';
import isEmail from 'validator/lib/isEmail';


import {captchaDev} from '../../config/config';
class LoginForm extends Component {
	state = {
		data: {
			documento: '',
			email: '',
			password: '',
			token : '',
			captcha: false
			
		},
		loading: false,
		errors: {}
	};
	componentDidUpdate(prevProps){
		if(prevProps.errors !== this.props.errors){
			this.setState({errors : this.props.errors});
		}
	}
	handleStringChange = (e) => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors});
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			let {email, password} = this.state.data
			this.props.submit({email,password});
			//.catch(err=> this.setState({errors:err.response.data.errors, loading:false}));
		}
	};
	validate = (data) => {
		const errors = {};
		if (!isEmail(data.email)) errors.email = 'Email invalido';
		if (!data.documento) errors.documento = 'Debe ingresar el documento';
		if (!data.email) errors.email = 'Debe ingresar el email';
		if (!data.password) errors.password = 'Debe ingresar la Contraseña';
		if (!data.captcha) errors.captcha = 'Debe confirmar el captcha';
		return errors;
	};

	onChangeCaptcha = () => {
		this.setState({ data: { ...this.state.data, captcha: true } });
	};
	
	render() {
		const { data, errors} = this.state;
		let errorsList = [];
		if(Object.keys(errors).length !== 0){
			
			Object.keys(errors).forEach(
				key=> errorsList.push(errors[key]));
		}
		
		return (
			<div className='login-form'>
				<style>{`
					body > div,
					body > div > div,
					body > div > div > div.login-form {
						height: 100%;
					}
					`}
				</style>
				<Grid textAlign='center' style={{ height: '100%', top : '50%'}} verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 500 }}>
						<Header as='h2' content='Ingresar' className="header"/>
						<Form size='large' error={Object.keys(errors).length !== 0 ? true : false} onSubmit={this.handleSubmit}>
							<Segment stacked>
								<Form.Input
									fluid
									required
									icon='address card'
									iconPosition='left'
									type="text"
									id="documento"
									name="documento"
									placeholder='Documento'
									error={errors.documento ? true : false}
									
									value={data.documento}
									onChange={this.handleStringChange}/>
								
								<Form.Input 
									fluid
									required
									icon='user' iconPosition='left'
									id="email"
									type="email"
									placeholder='Email'
									error={errors.email ? true : false}
									name="email"
									value={data.email}
									onChange={this.handleStringChange}
								/>
								<Form.Input
									fluid
									required
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
									fluid
									color='google plus'
								>Ingresar</Button>
							</Segment>
						</Form>
						<Message>
							Ha Olvidado la Contraseña? <Link to="/recuperar">Recuperar</Link>
						</Message>
					</Grid.Column>
				</Grid>
			</div>
			
		);
	}
}

export default LoginForm;
