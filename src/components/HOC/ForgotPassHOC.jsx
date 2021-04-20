import React, { Component } from 'react';
import { forgot } from '../../api/users';

function forgotBackend(WrappedComponent) {
    class ForgotPasswordHOC extends Component {
        
        onSubmit = async (userEmail) => {
            await forgot({userEmail});
        }

        render() { 
            return (
                <WrappedComponent onSubmitHandler={this.onSubmit} />
            );
        }
    }
    
    return ForgotPasswordHOC;
}

export default forgotBackend;