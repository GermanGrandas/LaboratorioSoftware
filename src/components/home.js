import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginForm from './LoginPage';
import SignForm from './signup';

class Home extends Component{
	state = {
		e : "login"
	}
	update = (e)=>{
		this.setState({e : e.target.name});
	}
	render(){
		return(
			<div className="section white">
					<div className='white medium-nav'>
						<ul className='right'>
							<li>
								<Link to="#" name='login' className='black-text'onClick={this.update}>Login</Link>
							</li>
							<li>
								<Link to="#" name='sign' className='black-text' onClick={this.update}>Sign Up</Link>
							</li>
						</ul>
					</div>
					{
						this.state.e ==='login' ? <LoginForm history={this.props.history} login={this.props.login} setMessage={this.props.setMessage}/> : <SignForm history={this.props.history} setMessage={this.props.setMessage} />
					}
			</div>
		)
	}				
}

Home.propTypes = {
    setMessage : PropTypes.func.isRequired
}
export default Home;
