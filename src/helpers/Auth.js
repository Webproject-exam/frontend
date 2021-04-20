// Code from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/helpers/Auth.js
// and https://codesandbox.io/s/q9m26noky6?file=/src/helpers/AuthContext.js:0-638
import React from 'react';
import { login, tokenRevoke } from '../api/users';
import { clear, read, store } from './refresh-token';

const INITIAL_STATE = { auth: false, token: null, role: null };

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = { ...INITIAL_STATE };

    componentDidMount() {
        const token = read("token");
        const isAuth = read("auth");
        const role = read("role");

        if (token && isAuth) {
            this.setState({ auth: true, token, role });
        }
    }

    login = async (userData) => {
        const { email, password } = userData;
        try {
            const response = await login(email, password);
            const userRole = response.data.role;
            const token = response.data.jwtToken;

            this.setState({ auth: true, token, role: userRole }, () => {
                store("token", token)
                store("auth", true)
                store("role", userRole)
            });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    logout = async () => {
        this.setState({ ...INITIAL_STATE });
        clear();
        await tokenRevoke();
    };

    isAuthFunc = () => {
        return this.state.auth || read("token") != null;
    };

    isRoleSet = () => {
        if(this.state.role === "manager" || read("role") === "manager"){
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    isAuth: this.state.auth,
                    isAuthFunc: this.isAuthFunc,
                    token: this.state.token,
                    role: this.state.role,
                    isRoleSet: this.isRoleSet,
                    login: this.login,
                    logout: this.logout
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer;
export { AuthContext, AuthProvider, AuthConsumer };
