import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';


export default function PrivateRoute( { redirectTo, role, children, ...rest } ){
    const authen = useSelector(state => state.authen);
    console.log(authen)
    const user = jwt_decode(authen.user);
    const result = user.roles.filter(function(o1){
        return role.some(function(o2){
            return o1.titre === o2.name;          
        });
    })
    return (
        <Route {...rest}>
            { result.length > 0 || role.length === 0 ? children : <Redirect to={ { pathname: redirectTo }} />  }
        </Route>
    );
}





