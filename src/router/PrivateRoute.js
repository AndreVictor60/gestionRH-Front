import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";


export default function PrivateRoute( { redirectTo, role, children, ...rest } ){
    const authen = useSelector(state => state.authen);
    console.log("role",role);
    return (
        <Route {...rest}>
            { authen.isLoggedIn ? children : <Redirect to={ { pathname: redirectTo }} />  }
        </Route>
    );
}




