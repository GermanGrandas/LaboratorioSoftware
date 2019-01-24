import React from 'react';
import {Route, Redirect } from 'react-router-dom';


const AdminRoute = ({user,render,...rest})=>{
    return(
        <Route {...rest}
            render={ props => user.token ? (
                render(props)
            ):(
                <Redirect to='/'/>
            )}
        />
    )
}

export default AdminRoute;

