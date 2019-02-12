import React from 'react';
import {Image} from 'semantic-ui-react'
import './index.css';

const TopComp = ()=>{
    return(
                <div className={'containerHeader'}>
                    <header
                        as='h1'
                        
                        style={{
                            top: '50',
                            fontSize: '7vw',
                            fontFamily: "'Courgette','Pacifico'",
                        }}
                    >DocentHelper</header>
                <Image src={'../images/logo_docent.png'} alt='Logo_DocentHelper' />
                </div> 
        
    )
}

export default TopComp;