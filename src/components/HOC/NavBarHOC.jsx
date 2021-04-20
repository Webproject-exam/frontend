import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';

function navBarBackend(WrappedComponent) {
    class NavBarHOC extends Component {
        static contextType = AuthContext;
        constructor(props) {
            super(props);
            this.state = {  }
        }

        handleLogOut = () => {
            this.context.logout();
        }

        render() { 
            const auth = this.context.isAuth;
            const role = this.context.role;
            return (
                <WrappedComponent handleLogOut={this.handleLogOut} auth={auth} role={role} />
            );
        }
    }
    
    return NavBarHOC;
}

export default navBarBackend