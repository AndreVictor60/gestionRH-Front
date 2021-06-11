import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";


export default function ProtectedRoute( { redirectTo, children, ...rest } ){
    const authen = useSelector(state => state.authen);
    console.log(authen.isLoggedIn && rest.pathname === "/login" && !!localStorage.token)
    return (
        <Route {...rest}>
            { authen.isLoggedIn ? children : <Redirect to={ { pathname: redirectTo }} />  }
        </Route>
    );
}