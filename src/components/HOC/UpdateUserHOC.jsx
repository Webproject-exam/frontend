import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { updateMyProfile, updateUser } from '../../api/users';

function updateUserBackend(WrappedComponent) {
    class UpdateUserHOC extends Component {
        static contextType = AuthContext;
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                error: null
            }
        }

        updateDashboard = async (userObject) => {
            this.setState({ error: null });
            try {
                await updateUser(userObject);
            } catch (error) {
                this.setState({ error: error.response.data.error });
            }

            if (!this.state.error) {
                this.setState({ data: userObject });
                this.props.onUpdateForm();
            }
        }

        updateProfile = async (userObject) => {
            this.setState({ error: null });
            try {
                await updateMyProfile(userObject);

            } catch (error) {
                this.setState({ error: error.response.data.error });
            }

            if (!this.state.error) {
                this.setState({ data: userObject });
                this.props.onUpdateForm();
            }
        }

        render() {
            return (
                <>
                    <WrappedComponent
                        selectedUser={this.props.selectedUser}
                        place={this.props.place}
                        onResetClick={this.props.onResetClick}
                        onUpdateDashboard={this.updateDashboard}
                        onUpdateProfile={this.updateProfile}
                        onAbortClick={this.props.onAbortClick}
                        error={this.state.error}
                    />
                </>
            );
        }
    }

    return UpdateUserHOC;
}

export default updateUserBackend;