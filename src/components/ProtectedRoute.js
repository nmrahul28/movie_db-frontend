import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route {...rest}
            render={(props) => {
                if (authenticated===true) {
                    console.log(authenticated)
                    return <Component {...props} />
                }
                else {
                    return <Redirect to={
                        {
                            pathname: '/'
                        }
                    } />
                }
            }} />
        // <Route render={(props) => (authenticated ? <Component/> :
        //     <Redirect to="/" />)} {...rest} />
    );
}
export default ProtectedRoute;