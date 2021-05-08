import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { createUser } from '../../api/users';
import { createPlant } from '../../api/plants';

function addUserBackend(WrappedComponent) {
    class AddUserHOC extends Component {
        static contextType = AuthContext;
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                error: null
            };
        }

        componentDidMount(){
            this._isMounted = true;
        }

        componentWillUnmount(){
            this._isMounted = false;
        }

        onSubmit = async (itemObject) => {
            console.log(itemObject);
            //Send the information stored in the state to the back-end
            if (this._isMounted && this.props.place === "users") {
                try {
                    await createUser(itemObject);
                    this.props.onSubmit("users");
                } catch (error) {
                    this.setState({
                        error: error
                    })
                }
            } else if (this._isMounted && this.props.place === "plants"){
                try {
                    await createPlant(itemObject);
                    this.props.onSubmit("plants");
                } catch (error) {
                    this.setState({
                        error: error
                    })
                }
            } else {
                console.log("Anything else");
            }
        }

        render() {
            console.log(this.props);
            return (
                <WrappedComponent onSubmitHandler={this.onSubmit} error={this.state.error} removeErrorHandler={this.removeError} {...this.props} />
            );
        }
    }

    return AddUserHOC;
}

export default addUserBackend;