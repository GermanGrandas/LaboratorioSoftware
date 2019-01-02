import React from 'react';
import Img from 'react-image';

const TopNav = () => {
	return (
		<div id='top' className="parallax-container">
			<Img className="parallax" src="./images/desk.jpg" alt="tablero" />
			<h1 className="header center white-text">Docent Helper</h1>
		</div>
	);
};

export default TopNav;