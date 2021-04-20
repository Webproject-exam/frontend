import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import UpdateUser from '../UpdateUser/UpdateUser';
import UserFeedbackCard from '../UserFeedbackCard/UserFeedbackCard'
import updateUserBackend from './UpdateUserHOC';
import { AuthContext } from '../../helpers/Auth';
import { fetchUser } from '../../api/users';

function withUserBackEnd(WrappedComponent) {
    class MyProfileHOC extends Component {
        static contextType = AuthContext;
        constructor(props) {
            super(props);
            this.state = {
                myUser: [],
                isLoading: true,
                error: null,
                willEdit: false,
                successfullyUpdated: false
            };
        }

        async componentDidMount() {
            await this.fetchData();
        }

        //The fetchData method gets the data from the back-end and saves the current user in the sate
        fetchData = async () => {
            const res = await fetchUser();

            if (res.error) {
                this.setState({
                    error: res.error
                })
            } else {
                this.setState({
                    myUser: res.data,
                    isLoading: false,
                    error: null
                })
            }
        }

        //The toggleWillEdit method toggles a form where the user can update their information
        toggleWillEdit = () => {
            this.setState({
                willEdit: !this.state.willEdit,
                successfullyUpdated: false
            })
        }

        //The handleCloseMessage method closes the UserFeedbackcard component after the for has been submitted
        handleCloseMessage = () => {
            this.setState({ successfullyUpdated: false })
        }

        //The handleSuccess method opens the UserFeedbackcard component and closes the edit form
        handleSuccess = () => {
            this.setState({
                successfullyUpdated: true,
                willEdit: false
            })
        }

        render() {
            const UpdateUserHOC = updateUserBackend(UpdateUser);

            if (this.state.error) {
                return (<p>{this.state.error}</p>)
            }
            if (this.state.isLoading) {
                return (<Loading />);
            }
            return (
                <>
                    <WrappedComponent selectedUser={this.state.myUser} {...this.props} handleEditClick={this.toggleWillEdit} />
                    {this.state.successfullyUpdated && <UserFeedbackCard onClick={this.handleCloseMessage} variant="success" feedbackText="The user has been updated." />}
                    {this.state.willEdit && <UpdateUserHOC selectedUser={this.state.myUser} place="profile" onUpdateForm={() => { this.fetchData(); this.handleSuccess(); }} />}
                </>
            );
        }
    }

    return MyProfileHOC;
}

export default withUserBackEnd;