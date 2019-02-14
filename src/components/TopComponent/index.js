<<<<<<< HEAD
import React from 'react';
import './index.css';

const TopComp = ()=>{
    return(
                <div class={'containerHeader'}>
                <img src={require('../images/logo_docent.png')} alt='Logo DocentHelper' />
                <center>
                <header
                    as='h1'
                    
                    style={{
                        fontSize: '3em',
                        fontFamily: "'Courgette','Pacifico'",
                    }}
                >DocentHelper</header>
                </center>
                </div> 
        
    )
}

=======
import React from 'react';
import './index.css';

const TopComp = ()=>{
    return(
                <div className={'containerHeader'}>
                <div><img src={require('../images/logo_docent.png')} alt='Logo DocentHelper' /></div>
                <div><header
                    as='h1'
                >DocentHelper</header></div>
                </div> 
        
    )
}

>>>>>>> b6dd8b22583810ce42c6c7b43d8097c7146e9c39
export default TopComp;