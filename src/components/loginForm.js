import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import FormInlineMessage from './FormInlineMessage';

class LoginForm extends Component {
	state = {
		data: {
			documento: '',
			email: '',
			password: ''
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
			console.log(this.state.data);
			//this.props.submit(this.state.data);
			//alert('UserSaved');.catch(err=> this.setState({errors:err.response.data.errors, loading:false}));
		}
	};
	validate = (data) => {
		const errors = {};
		//if(!isEmail(data.email)) errors.email = 'Invalid Email Address';
		if (!data.documento) errors.documento = 'Debe ingresar el documento';
		if (!data.email) errors.email = 'Debe ingresar el email';
		if (!data.password) errors.password = 'Debe ingresar la Contraseña';
		return errors;
	};
	render() {
		const { data, errors } = this.state;
		return (
			<div className="container">
				<form className="col s6" onSubmit={this.handleSubmit}>
					<h2 className="header">Login</h2>
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
					<Link to='#' className='link'>recuperar la contraseña</Link>

					<button className="btn black waves-effect waves-light" type="submit">
						Ingresar
					</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
