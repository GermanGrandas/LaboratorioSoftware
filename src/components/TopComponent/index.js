import React from 'react';
import './index.css';

const TopComp = ()=>{
    return(
                <div className={'containerHeader'}>
                <div><img src={'../images/logo_docent.png'} alt='Logo DocentHelper' /></div>
                <div><header
                    as='h1'
                >DocentHelper</header></div>
                </div> 
        
    )
}

export default TopComp;