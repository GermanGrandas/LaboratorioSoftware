import React from 'react';
import './index.css';

const TopComp = ()=>{
    return(
                <div class={'containerHeader'}>
                <header
                    as='h1'
                    
                    style={{
                        top: '50',
                        fontSize: '7vw',
                        fontFamily: "'Courgette','Pacifico'",
                    }}
                >DocentHelper</header>
                <img src={require('../images/logo_docent.png')} alt='Logo DocentHelper' />
                </div> 
        
    )
}

export default TopComp;