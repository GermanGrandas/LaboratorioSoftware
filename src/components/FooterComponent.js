import React from 'react';
import Img from 'react-image';

const Footer = () => {
	return (
		<footer className="page-footer black">
			<div className='section'>
				<h5 className='special'>
					Made by a group of noobs
				</h5>
				<div className='poll_container'>
					<div className='poll_item'>
						<Img className="circle" src="./images/yo.jpg" alt="yo" />
						<h4>Germán Grandas</h4>
					</div>
					<div className='poll_item'>
						<Img className="circle" src="./images/jhoan.jpg" alt="jhoan" />
						<h4>Jhoan Marín</h4>
					</div>
					<div className='poll_item'>
						<Img className="circle" src="./images/mauro.jpg" alt="mauro" />
						<h4>Mauricio Castaño</h4>
					</div>
				</div>
			</div>
			<div className="footer-copyright">
				<div className="container">
				© 2018 Copyright 
				<a className="right" href="https://github.com/GermanGrandas/LaboratorioSoftware" rel="noreferrer noopener" target="_blank">
					<Img className="gitLogo" src="./images/GitHub-Mark-Light-64px.png" alt="github" />
				</a>
				</div>
          	</div>
		</footer>
		
	);
};

export default Footer;
