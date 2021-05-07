import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import Popup from '../Popup/Popup'
import { AuthContext } from '../../helpers/Auth';
import { fetchAllUsers, deleteUser, forgot } from '../../api/users';
import { notifySuccess, notifyError } from '../../helpers/notification';
import Prompt from '../Prompt/Prompt';
import UpdateUserForm from '../UpdateUser/UpdateUser';
import updateUserBackend from '../HOC/UpdateUserHOC';

function withUsersFetch(WrappedComponent) {
    class UserTableHOC extends Component {
        static contextType = AuthContext;
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                users: [],
                isLoading: true,
                error: null,
                delete: false,
                edit: false,
                selectedUser: {}
            };
        }

        async componentDidMount() {
            this._isMounted = true;
            await this.fetchData();
        }

        resetPassword = async () => {
            const email = this.state.selectedUser.email;
            this.setState({ isLoading: true });
            const res = await forgot({ userEmail: email });

            if (res.error) {
                this.setState({ error: res.error, isLoading: false });
                notifyError("Something went wrong... please try again.")
            } else {
                notifySuccess(`An email with instructions have been sent to ${email}.`)
                this.setState({
                    edit: false,
                    selectedUser: {},
                    error: null,
                    isLoading: false
                })
            }
        }

        fetchData = async () => {
            const res = await fetchAllUsers()

            if (res.error) {
                this._isMounted && this.setState({
                    error: res.error
                })
            } else {
                this._isMounted && this.setState({
                    users: res.data,
                    isLoading: false,
                    error: null,
                    edit: false
                })
            }
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        selectDelete = (user) => {
            this.setState({ delete: true, selectedUser: user });
        }

        selectEdit = (user) => {
            console.log(user);
            this.setState({ edit: true, selectedUser: user });
        }

        deleteUser = async () => {
            const emailToDelete = { email: this.state.selectedUser.email };
            const res = await deleteUser(emailToDelete);

            if (res.error) {
                this.setState({
                    error: res.error
                })
                notifyError("Something went wrong... please try again.")
            } else {
                notifySuccess(`The user ${this.state.selectedUser.name} ${this.state.selectedUser.surname} has been deleted. 🗑️`);
                this.setState({
                    delete: false,
                    selectedUser: {},
                    error: null
                });
                await this.fetchData();
            }
        }

        editUser = async () => {
            await this.fetchData();
            this.setState({
                edit: false,
                selectedUser: {},
                error: null
            })
        }

        cancelAction = () => {
            this.setState({
                delete: false,
                edit: false,
                selectedUser: {}
            })
        }

        render() {
            const UpdateUserHOC = updateUserBackend(UpdateUserForm);

            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <>
                    <WrappedComponent handleEditClick={this.selectEdit} handleDeleteClick={this.selectDelete} users={this.state.users} {...this.props} />
                    {this.state.edit &&
                    //Update user form
                        <Popup content={
                            <UpdateUserHOC
                            onUpdateForm={this.fetchData} selectedUser={this.state.selectedUser} place='dashboard' onAbortClick={this.cancelAction} onResetClick={this.resetPassword}
                            />
                            } 
                        />
                    }

                    {this.state.delete &&
                        <Popup content={<Prompt onCancelClick={this.cancelAction} onConfirmClick={this.deleteUser} user={this.state.selectedUser} type='delete'  />} />
                    }
                </>
            );
        }
    }

    return UserTableHOC
}

export default withUsersFetch;