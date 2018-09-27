import React from 'react';
import Img from 'react-image';

const TopNav = () => {
	return (
		<div className="parallax-container">
			<Img className="parallax" src="./images/desk.jpg" alt="tablero" />
			<h1 className="header center white-text">DocentHelper</h1>
		</div>
	);
};

export default TopNav;
