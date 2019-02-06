import React from 'react';
import {Route, Redirect } from 'react-router-dom';


const SpecialRoute = ({user,render,...rest})=>{
    return(
        <Route {...rest}
            render={ props => !user.token ? (
                render(props)
            ):(
                <Redirect to='/home'/>
            )}
        />
    )
}

export default SpecialRoute;