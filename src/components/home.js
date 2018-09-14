import React, { Component } from 'react';

import TopComponent from './TopComponent';
import LoginForm from './loginForm.js';
import Footer from './FooterComponent';



class Home extends Component {

	render(){
		return (
			<div>
				<TopComponent />
				<div className="section white">
					<LoginForm />
				</div>
				<Footer />
			</div>
		);
	}
}

export default Home;
