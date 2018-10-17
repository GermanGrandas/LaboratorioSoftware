import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import Select from 'react-select';

import isEmail from 'validator/lib/isEmail';
import ReCAPTCHA from 'react-google-recaptcha';
import country from 'country-state-city';

//https://www.npmjs.com/package/react-country-region-selector
//http://country-regions.github.io/react-country-region-selector/
//https://www.npmjs.com/package/country-state-city

import FormInlineMessage from './FormInlineMessage';

class SignForm extends Component {
	state = {
		data: {
            Tdocumento: '',
			documento: '',
			email: '',
			nombre: '',
			apellido: '',
			password: '',
			passwordValidation: '',
			fechaNacimiento : '',
			paisNacimiento : '',
			regionNacimiento : '',
			ciudadNacimiento : '',
			captcha: false
		},
		loading: false,
		errors: {},
	};

	countryData = {}
	handleStringChange = (e) => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});
	};
	handleCountryChange = (data)=>{
		this.setState({
			data: { ...this.state.data, paisNacimiento: data }
		});
		let states = country.getStatesOfCountry(data.id);
		let c =states.map((x)=>{
			return {value : x.name,label :x.name , id : x.id}
		});
		this.countryData.states = c;
	}
	handleStateChange = (data)=>{
		this.setState({
			data: { ...this.state.data, regionNacimiento: data }
		});
		let cities = country.getCitiesOfState(data.id);
		let c =cities.map((x)=>{
			return {value : x.name,label :x.name , id : x.id}
		});
		this.countryData.cities = c;
	}
	handleCitiesChange = (data)=>{
		this.setState({
			data: { ...this.state.data, ciudadNacimiento: data }
		});
	}
	componentWillMount(){
		let data = country.getAllCountries();
		let c =data.map((x)=>{
			return {value : x.name,label :x.name , id : x.id}
		});
		this.countryData.pais = c;
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data);
			//alert('UserSaved');.catch(err=> this.setState({errors:err.response.data.errors, loading:false}));
		}
	};
	validate = (data) => {
		const errors = {};
		if (!isEmail(data.email)) errors.email = 'Email invalido';
		if (!data.documento) errors.documento = 'Debe ingresar el documento';
		if (!data.nombre) errors.nombre = 'Debe ingresar un nombre';
		if (!data.apellido) errors.apellido = 'Debe ingresar un apellido';
		if (!data.email) errors.email = 'Debe ingresar el email';
		if (!data.password) errors.password = 'Debe ingresar la Contraseña';
		if (!data.captcha) errors.captcha = 'Debe confirmar el captcha';
		if (data.passwordValidation !== data.password) {
			errors.passwordValidation = 'Las contraseñas no coínciden';
			errors.password = 'Las contraseñas no coínciden';
		}
		return errors;
	};
	onChangeCaptcha = () => {
		this.setState({ data: { ...this.state.data, captcha: true } });
	};
	handleDateChange=(date)=>{
		this.setState({
			data: { ...this.state.data, fechaNacimiento: date }
		});
	}
	render() {
		const { data, errors} = this.state;
		const today = new Date(Date.now());
		return (
			<div className="container">
				<form className="col s12" onSubmit={this.handleSubmit}>
					<h3 className="header">Sign Up</h3>
					<div className="row">
						<div className="col s4">
                            <label id='font'>Tipo de documento</label>
                            <select className='browser-default'
                                name='Tdocumento'
                                value={data.Tdocumento}
								onChange={this.handleStringChange}
                            >
								<option value="" disabled selected>
									Seleccione una opcion
								</option>
								<option value="cedula">Cédula</option>
								<option value="pasaporte">Pasaporte</option>
							</select>
						</div>
						<div className="input-field col s4">
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
						<div className="input-field col s4">
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
					</div>
					<div className="row">
						<div className="input-field col s6">
							<input
								type="text"
								id="nombre"
								name="nombre"
								className={errors.nombre ? 'validate invalid' : 'validate'}
								value={data.nombre}
								onChange={this.handleStringChange}
							/>
							<label id="font" htmlFor="nombre">
								Nombre
							</label>
							<FormInlineMessage content={errors.nombre} type="error" />
						</div>
						<div className="input-field col s6">
							<input
								id="apellido"
								type="text"
								className={errors.apellido ? 'validate invalid' : 'validate'}
								name="apellido"
								value={data.apellido}
								onChange={this.handleStringChange}
							/>
							<label id="font" htmlFor="apellido">
								Apellido
							</label>
							<FormInlineMessage content={errors.apellido} type="error" />
						</div>
					</div>
					<div className="row">
						<div className="input-field col s4">
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
						<div className="input-field col s4">
							<input
								id="passwordValidation"
								type="password"
								className={errors.passwordValidation ? 'validate invalid' : 'validate'}
								name="passwordValidation"
								value={data.passwordValidation}
								onChange={this.handleStringChange}
							/>
							<label id="font" htmlFor="passwordValidation">
								Confirmar Contraseña
							</label>
							<FormInlineMessage content={errors.passwordValidation} type="error" />
						</div>
						<div className="col s4">
								<label id="font" htmlFor="fechaNacimiento">
									Fecha Nacimiento
								</label>	
								<DatePicker
									locale = 'es-CO'
									minDate = {new Date(today.getFullYear()-100,today.getDate(),today.getDay())}
									maxDate = {new Date(today.getFullYear()-20,today.getDate(),today.getDay())}
									onChange={this.handleDateChange}
									value={data.fechaNacimiento}
								/>
						</div>
					</div>
					<div className='row'>
						<div className="col s4">
							<label id="font" htmlFor="paisNacimiento">
										País Nacimiento
							</label>
							<Select
								value={data.paisNacimiento}
								onChange={this.handleCountryChange}
								options={this.countryData.pais}
							/>
						</div>
						<div className="col s4">
							<label id="font" htmlFor="paisNacimiento">
										Estado Nacimiento
							</label>
							<Select
								value={data.regionNacimiento}
								onChange={this.handleStateChange}
								options={this.countryData.states}
							/>
						</div>
						<div className="col s4">
							<label id="font" htmlFor="paisNacimiento">
										Ciudad Nacimiento
							</label>
							<Select
								value={data.ciudadNacimiento}
								onChange={this.handleCitiesChange}
								options={this.countryData.cities}
							/>
						</div>
					</div>
					<div className="col s10 m5 xs5">
						<FormInlineMessage content={errors.captcha} type="error" />
						<ReCAPTCHA
							ref="recaptcha"
							sitekey="6LdwoGoUAAAAAOIjSUoj1TO5KKeDEt-TBKs2oHXz"
							onChange={this.onChangeCaptcha}
							className="s12 captcha"
						/>
						
					</div>
					<div className="col s12 m10">
						<button className="btn black waves-effect waves-light" type="submit">
							Crear Usuario
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default SignForm;
