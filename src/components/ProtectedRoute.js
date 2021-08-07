import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
                if (localStorage.getItem('userEmail')!==null) {
                    console.log('authenticated')
                    return <Component {...props} />
                }
                else {
                    return <Redirect to='/' />
                }
            }} />
        
    );
}
export default ProtectedRoute;