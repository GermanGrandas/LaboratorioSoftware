import React from 'react';
import {Header,Segment} from 'semantic-ui-react';
import './index.css';


const TopComp = ()=>{
    return(
            <Segment  style={{ height: 400, backgroundColor :'#372734'}}  inverted  vertical >
                <Header
                    as='h1'
                    content='Docent Helper'
                    className='center'
                    textAlign='center'
                    inverted
                    style={{
                        fontSize: '4em',
                        fontFamily: "'Courgette','Pacifico'",
                    }}
                />
            </Segment>
        
    )
}

export default TopComp;