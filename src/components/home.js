import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TopComponent from './TopComponent';
import LoginForm from './loginForm';
import SignForm from './signupForm';
import Footer from './FooterComponent';

class Home extends Component {
	state = {
		e : "login"
	}
	update = (e)=>{
		this.setState({e : e.target.name});
	}
	render(){
		return (
			<div>
				<TopComponent />
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
						this.state.e ==='login' ? <LoginForm/> : <SignForm/>
					}
				</div>
				<Footer />
			</div>
		);
	}
}

export default Home;
