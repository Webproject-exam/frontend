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

        onSubmit = async (itemObject) => {
            console.log(itemObject);
            //Send the information stored in the state to the back-end
            if (this.props.place === "users") {
                try {
                    await createUser(itemObject);
                } catch (error) {
                    this.setState({
                        error: error
                    })
                }
            } else if (this.props.place === "plants"){
                console.log("In plants");
                console.log(itemObject);
            } else {
                console.log("Anything else");
            }
        }

        removeError = () => {
            this.setState({
                error: null
            });
        }

        render() {
            console.log(this.props);
            return (
                <WrappedComponent onSubmitHandler={this.onSubmit} error={this.state.error} removeErrorHandler={this.removeError} />
            );
        }
    }

    return AddUserHOC;
}

export default addUserBackend;