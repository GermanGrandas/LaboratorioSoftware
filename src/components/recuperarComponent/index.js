import React,{Component} from "react";
import {Link} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import {Grid,Segment, Button,Form, Message, Header } from 'semantic-ui-react'
import ReCAPTCHA from 'react-google-recaptcha';

import TopComponent from '../TopComponent';
import Footer from '../footerComponent';
import api from '../../api';

import {captchaProd} from '../../config/config';

class Recuperar extends Component{
    state = {
        data :{
            email :'',
            documento : '',
            username : '',
            captcha : false
        },
        loading: false,
		errors: {}
    }

    submit = data=> api.users.recuperar(data).then(token=>{
       	if (!token.mensaje) {
			alert(token.Mensaje);
            this.props.history.push('/');
        } else {
            this.setState({errors : {mensaje : token.mensaje}});
        	}
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
			this.submit(this.state.data);
			//alert('UserSaved');.catch(err=> this.setState({errors:err.response.data.errors, loading:false}));
		}
    };
    validate = (data) => {
		const errors = {};
		if (!isEmail(data.email)) errors.email = 'Email invalido';
		if (!data.email) errors.email = 'Debe ingresar el email';
		if (!data.captcha) errors.captcha = 'Debe confirmar el captcha';
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
                <div className='login-form'>
				<Grid textAlign='center' className='rec' verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 500 }}>
						<Header as='h2' content='Recuperar Contraseña' className="header"/>
						<Form size='large' error={Object.keys(errors).length !== 0 ? true : false} onSubmit={this.handleSubmit}>
							<Segment stacked>
								<Form.Input
									fluid
									icon='lock'
              						iconPosition='left'
									id="email"
									type="email"
									placeholder='email'
									error={errors.email ? true : false}
									name="email"
									value={data.email}
									onChange={this.handleStringChange}
								/>
								<Form.Field error={errors.captcha ? true : false}>
									<ReCAPTCHA
										ref="recaptcha"
										sitekey={captchaProd}
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
                                    style={{
										width:'10em',
										maxWidth:'30em',
										backgroundColor:'rgba(190, 140, 93)'
									}}
                                >Recuperar</Button>
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

export default Recuperar;