import React,{Component} from "react";
import {Link} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import ReCAPTCHA from 'react-google-recaptcha';
import FormInlineMessage from './FormInlineMessage';
import TopComponent from './TopComponent';
import Footer from './FooterComponent';

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
        return(
            <div>
                <TopComponent />
                <div className="section white">
                    <div className='white medium-nav'>
                        <ul className='right'>
                            <li>
                                <Link to="/" name='Home' className='black-text'>Volver</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="container">
                        <form className="col s6" onSubmit={this.handleSubmit}>
                            <h3 className="header">Recuperar Contraseña</h3>
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

export default Recuperar;