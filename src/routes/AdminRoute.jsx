// Code from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/routes/PrivateRoute.jsx

import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from '../helpers/Auth';

const AdminRoute = ({ children, ...rest }) => (
    <AuthConsumer>
        {({ isRoleSet }) => (
            <Route {...rest} render={({ location }) =>
                isRoleSet() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/403",
                            state: { from: location }
                        }}
                    />
                )}
            />
        )}
    </AuthConsumer>
);

export default AdminRoute;