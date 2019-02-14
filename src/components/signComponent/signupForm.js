import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

import {Grid,Segment, Button,Form, Message, Header, Select } from 'semantic-ui-react'
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import matches from 'validator/lib/matches';
import ReCAPTCHA from 'react-google-recaptcha';
import country from 'country-state-city';


import {captchaProd} from '../../config/config';


const genderOp = [{ key: 'm', text: 'Masculino', value: 'masculino' },
							{ key: 'f', text: 'Femenino', value: 'femenino' },
							{ key: 'o', text: 'Otro', value: 'otro' }]

const documentOp = [{ key: 'c', text: 'Cedula', value: 'cedula' },
							{ key: 'p', text: 'Pasaporte', value: 'Pasaporte' },]
class SignForm extends Component {
	state = {
		data: {
            Tdocumento: '',
			documento: '',
			email: '',
			nombre: '',
			apellido: '',
			password: '',
			genero : '',
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

	countryData = {
		pais : [],
		states : [],
		cities : []
	}
	async componentDidUpdate(prevProps){
		if(prevProps.errors !== this.props.errors){
			this.setState({errors : this.props.errors});
		}
	}
	handleStringChange = (e,{value}) => {		
		this.setState({
			data: { ...this.state.data, [e.target.name]: value }
		});
	};

	handleSelectChange = (e,{value}) =>{
		this.setState({ data: { ...this.state.data, Tdocumento: value } });
	}
	handleGeneroChange = (e,{value})=>{
		this.setState({ data: { ...this.state.data, genero: value } });
	}
	 handleCountryChange = (e,{value})=>{
		
		let pais = country.getCountryById(parseInt(value,10)-1)
		let name = pais.name
		
		this.setState({//
			data: { ...this.state.data, paisNacimiento:name.toString(),regionNacimiento: '', ciudadNacimiento: ''}
		});
		let states = country.getStatesOfCountry(value);
		let c =states.map((x)=>{
			return {key :x.id ,text :x.name , value :x.id }
		});
		this.countryData.states = c;
	}
	handleStateChange = (e,{value})=>{
		let estado = country.getStateById(parseInt(value,10)-1)
		this.setState({
			data: { ...this.state.data, regionNacimiento: estado.name,ciudadNacimiento: '' }
		});
		let cities = country.getCitiesOfState(value);
		let c =cities.map((x)=>{
			return {key :x.id ,text :x.name , value :x.id }
		});
		this.countryData.cities = c;
	}
	handleCitiesChange = (e,{value})=>{
		let city = country.getCityById(parseInt(value,10)-1)
		this.setState({
			data: { ...this.state.data, ciudadNacimiento: city.name }
		});
	}
	componentWillMount(){
		let data = country.getAllCountries();
		let c =data.map((x)=>{
			return {key :x.id,text :x.name,value :x.id }
		});
		this.countryData.pais = c;
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.props.submit(this.state.data);
		}
	};
	validate = (data) => {
		const errors = {};
		let reg =/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+(([',. -][a-zA-Z ñÑáéíóúÁÉÍÓÚüÜ])?[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]*)*$/;
		if (!isEmail(data.email)) errors.email = 'Email invalido';
		if (!data.documento) errors.documento = 'Debe ingresar el documento';
		if (!data.nombre) errors.nombre = 'Debe ingresar un nombre';
		if(!matches(data.nombre,reg)) errors.nombre = 'Debe ingresar solo letras en el nombre';
		if(!matches(data.apellido,reg)) errors.apellido = 'Debe ingresar solo letras en el apellido';
		if (!data.apellido) errors.apellido = 'Debe ingresar un apellido';
		if (!data.email) errors.email = 'Debe ingresar el email';
		if (!data.password) errors.password = 'Debe ingresar la Contraseña';
		if (!data.captcha) errors.captcha = 'Debe confirmar el captcha';
		if (!data.genero) errors.genero = 'Debe ingresar un Genero';
		if(!data.fechaNacimiento) errors.fechaNacimiento = 'Debe Elegir una fecha de nacimiento';
		if(!data.paisNacimiento) errors.paisNacimiento = 'Debe ingresar un País de nacimiento';
		if(this.countryData.cities){
			if(!data.ciudadNacimiento && !(this.countryData.cities.length===0)) errors.ciudadNacimiento = 'Debe seleccionar una ciudad de nacimiento';
		}
		if(!data.regionNacimiento) errors.regionNacimiento = 'Debe ingresar un Estado de nacimiento';
		if(!data.Tdocumento) errors.Tdocumento = 'Debe seleccionar un Tipo de Documento'
		
		if(data.Tdocumento === 'cedula'){
			if(!isNumeric(data.documento)) errors.documento = 'El documento debe contener solo caracteres numéricos'
		}
		if(data.Tdocumento === 'Pasaporte'){
			if(!matches(data.documento,/^[A-Z]{3}[0-9]{6}/)) errors.documento = 'El documento no cumple con el formato'
		}
		if(data.password.length < 8) errors.password = 'La contraseña debe ser mínimo de 8 Caracteres';
		if (data.passwordValidation !== data.password) {
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
		let errorsList = [];
		if(Object.keys(errors).length !== 0){
			
			Object.keys(errors).forEach(
				key=> errorsList.push(errors[key]));
		}
		return (
			<div className='login-form'>
				<Grid>
					<Grid.Column style={{ maxWidth:'100em'}}>
						<Header as='h2' content='Registrarse' style={{textAlign:'center'}}/>
						<Form error={Object.keys(errors).length !== 0 ? true : false} onSubmit={this.handleSubmit}>
							<Segment stacked>
								<Form.Group style={{display:'block'}}>
									<Form.Select
										fluid
										required
										options={documentOp}
										placeholder='Tipo De Documento'
										error={errors.Tdocumento ? true : false}
										value={data.Tdocumento}
										onChange={this.handleSelectChange}
									/>
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
										onChange={this.handleStringChange}
									/>
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
									
								</Form.Group>
								<Form.Group style={{display:'block'}}>
									<Form.Input
										fluid
										required
										icon='user circle' iconPosition='left'
										type="text"
										id="nombre"
										name="nombre"
										placeholder='Nombre'
										error={errors.nombre ? true : false}
										value={data.nombre}
										onChange={this.handleStringChange}
									/>
									<Form.Input
										fluid
										required
										icon='user circle' iconPosition='left'
										type="text"
										id="apellido"
										name="apellido"
										placeholder='Apellido'
										error={errors.apellido ? true : false}
										value={data.apellido}
										onChange={this.handleStringChange}
									/>
								</Form.Group>
								<Form.Group style={{display:'block'}}>
									<Form.Input
										fluid
										required
										icon='privacy' iconPosition='left'
										id="password"
										type="password"
										name="password"
										placeholder='Contraseña'
										error={errors.password ? true : false}
										value={data.password}
										onChange={this.handleStringChange}
									/>
									<Form.Input
										fluid
										required
										icon='privacy' iconPosition='left'
										id="passwordValidation"
										type="password"
										name="passwordValidation"
										placeholder='Confirmar Contraseña'
										error={errors.passwordValidation ? true : false}
										value={data.passwordValidation}
										onChange={this.handleStringChange}
									/>
								</Form.Group>
								<Form.Group style={{display:'block'}}>
									<Form.Field
											fluid
											required
											control={Select}
											options={genderOp}
											placeholder='Genero'
											search
											searchInput={{ id: 'form-select-control-gender' }}
											error={errors.genero ? true : false}
											value={data.genero}
											onChange={this.handleGeneroChange}
									/>
									<Form.Field>
										<label id="font" htmlFor="fechaNacimiento">
											Fecha Nacimiento
										</label>
										<DatePicker
											name='fechaNacimiento'
											locale = 'es-CO'
											minDate = {new Date(today.getFullYear()-100,today.getDate(),today.getDay())}
											maxDate = {new Date(today.getFullYear()-20,today.getDate(),today.getDay())}
											onChange={this.handleDateChange}
											value={data.fechaNacimiento}
										/>
									</Form.Field>
								</Form.Group>
								<Form.Group style={{display:'block'}}>
									<Form.Select
												fluid
												required
												placeholder='País de Nacimiento'
												error={errors.paisNacimiento ? true : false}
												onChange={this.handleCountryChange}
												options={this.countryData.pais}
												search
												searchInput={{ id: 'form-select-control-cn' }}
									/>
									<Form.Select
											fluid
											required
											options={this.countryData.states}
											placeholder='Estado de Nacimiento'
											error={errors.regionNacimiento ? true : false}
											onChange={this.handleStateChange}
											search
											searchInput={{ id: 'form-select-control-sn' }}
											
									/>
									<Form.Select
											fluid
											required
											options={this.countryData.cities}
											placeholder='Ciudad de Nacimiento'
											error={errors.ciudadNacimiento ? true : false}
											onChange={this.handleCitiesChange}
											search
											searchInput={{ id: 'form-select-control-cin' }}
											
									/>
								</Form.Group>
								<Form.Field error={errors.captcha ? true : false}>
									<ReCAPTCHA
										ref="recaptcha"
										sitekey={captchaProd}
										size='normal'
										onChange={this.onChangeCaptcha}
										className="captcha"
									/>
								</Form.Field>
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
									style={{
										width:'10em',
										maxWidth:'30em',
										backgroundColor:'rgba(190, 140, 93)'
									}}
								>Registrarse</Button>
							</Segment>
						</Form>
					</Grid.Column>
				</Grid>
			</div>
			
		);
	}
}

export default SignForm;