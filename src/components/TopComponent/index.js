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

export default TopComp;