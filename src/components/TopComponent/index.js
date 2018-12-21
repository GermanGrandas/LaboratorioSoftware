import React from 'react';
import {Header,Segment} from 'semantic-ui-react';
import Particles from 'react-particles-js';
import './index.css';

import {particlesParams} from '../../config/config';
const TopComp = ()=>{
    return(
            <Segment  style={{ maxHeight: 400}}  inverted vertical >
                <Header
                    as='h1'
                    content='Docent Helper'
                    className='center'
                    textAlign='center'
                    style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                           color:'white',
                        fontFamily: "'Courgette','Pacifico'",
                    }}
                />
                <Particles params={particlesParams}
                    height={200}
                /> 
            </Segment>
        
    )
}

export default TopComp;