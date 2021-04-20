// Code from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/routes/PrivateRoute.jsx

import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from '../helpers/Auth';

const PrivateRoute = ({ children, ...rest }) => (
    <AuthConsumer>
        {({ isAuthFunc }) => (
            <Route {...rest} render={({ location }) =>
                isAuthFunc() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )}
            />
        )}
    </AuthConsumer>
);

export default PrivateRoute;