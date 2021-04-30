import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { createUser } from '../../api/users';

function addUserBackend(WrappedComponent) {
    class AddUserHOC extends Component {
        static contextType = AuthContext;
        constructor(props) {
            super(props);
            this.state = {
                error: null
            };
        }

        onSubmit = async (userObject) => {

            //Send the information stored in the state to the back-end
            try {
                await createUser(userObject);
            } catch (error) {
                this.setState({
                    error: error.response.data.error
                })
            }
        }

        removeError = () => {
            this.setState({
                error: null
            });
        }

        render() {
            return (
                <WrappedComponent onSubmitHandler={this.onSubmit} error={this.state.error} removeErrorHandler={this.removeError} />
            );
        }
    }

    return AddUserHOC;
}

export default addUserBackend;