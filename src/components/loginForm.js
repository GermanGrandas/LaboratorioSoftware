import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import FormInlineMessage from './FormInlineMessage';
import isEmail from 'validator/lib/isEmail';

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
			this.props.submit(this.state.data);
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
		const { data, errors } = this.state;
		return (
			<div className="container">
				<form className="col s6" onSubmit={this.handleSubmit}>
					<h3 className="header">Login</h3>
					<div className="input-field col s12 m10">
						<input
							type="text"
							id="documento"
							name="documento"
							className={errors.documento ? 'validate invalid' : 'validate'}
							value={data.documento}
							onChange={this.handleStringChange}
						/>
						<label id="font" htmlFor="documento">
							Documento
						</label>
						<FormInlineMessage content={errors.documento} type="error" />
					</div>
					<div className="input-field col s12 m10">
						<input
							id="email"
							type="email"
							className={errors.email ? 'validate invalid' : 'validate'}
							name="email"
							value={data.email}
							onChange={this.handleStringChange}
						/>
						<label id="font" htmlFor="email">
							Email
						</label>
						<FormInlineMessage content={errors.email} type="error" />
					</div>
					<div className="input-field col s12 m10">
						<input
							id="password"
							type="password"
							className={errors.password ? 'validate invalid' : 'validate'}
							name="password"
							value={data.password}
							onChange={this.handleStringChange}
						/>
						<label id="font" htmlFor="password">
							Contraseña
						</label>
						<FormInlineMessage content={errors.password} type="error" />
					</div>
					<div className="col s10">
						<ReCAPTCHA
							ref="recaptcha"
							sitekey="6LdwoGoUAAAAAOIjSUoj1TO5KKeDEt-TBKs2oHXz"
							onChange={this.onChangeCaptcha}
							className="s12 captcha"
						/>
						<FormInlineMessage content={errors.captcha} type="error" />
					</div>
					<div className="link">
						<Link to="/recuperar">Recuperar la contraseña</Link>
					</div>
					<div className="col s12 m10">
						<button className="btn black waves-effect waves-light" type="submit">
							Ingresar
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default LoginForm;
