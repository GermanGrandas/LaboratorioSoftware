import React,{Component} from "react";
import {Link} from 'react-router-dom';


import ReCAPTCHA from 'react-google-recaptcha';
import FormInlineMessage from './FormInlineMessage';
import TopComponent from './TopComponent';
import Footer from './FooterComponent';
import api from '../api';

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

    submit = data=> api.users.recuperar(data).then((params)=>{
        /**token =>{
            if (!token.err) {
                this.props.login(token)
            }*/
            console.log(params);
            this.props.history.push('/');
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
        return(
            <div>
                <TopComponent />
                <div className="section white">
                    <div className='white medium-nav'>
                        <ul className='right'>
                            <li>
                                <Link to="/" name='Home' className='black-text'>Cancelar</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="container">
                        <form className="col s6" onSubmit={this.handleSubmit}>
                            <h3 className="header">Recuperar Contraseña</h3>
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
                                    id="confirmPassword"
                                    type="password"
                                    className={errors.confirmPassword ? 'validate invalid' : 'validate'}
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={this.handleStringChange}
                                />
                                <label id="font" htmlFor="confirmPassword">
                                    Confirmar Contraseña
                                </label>
                                <FormInlineMessage content={errors.confirmPassword} type="error" />
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
                            <div className="col s12 m10">
                                <button className="btn black waves-effect waves-light" type="submit">
                                    Recuperar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

}

export default ChangePassword;