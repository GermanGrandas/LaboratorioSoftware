import React from 'react';
import './index.css';

const TopComp = ()=>{
    return(
                <div className={'containerHeader'}>
                <img src={require('../images/logo_docent.png')} alt='Logo DocentHelper' />
                <center>
                <header
                    as='h1'
                >DocentHelper</header>
                </center>
                </div> 
        
    )
}

export default TopComp;