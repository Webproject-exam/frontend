import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import UpdateUser from '../UpdateUser/UpdateUser';
import updateUserBackend from './UpdateUserHOC';
import { AuthContext } from '../../helpers/Auth';
import { fetchUser } from '../../api/users';
import Popup from '../Popup/Popup';

function withUserBackEnd(WrappedComponent) {
    class MyProfileHOC extends Component {
        static contextType = AuthContext;
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                myUser: [],
                isLoading: true,
                error: null,
                willEdit: false
            };
        }

        async componentDidMount() {
            this._isMounted = true;
            await this.fetchData();
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        //The fetchData method gets the data from the back-end and saves the current user in the sate
        fetchData = async () => {
            const res = await fetchUser();

            if (res.error) {
                this._isMounted && this.setState({
                    error: res.error
                })
            } else {
                this._isMounted && this.setState({
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
                    {this.state.willEdit && 
                    <Popup content={<UpdateUserHOC onAbortClick={this.toggleWillEdit} selectedUser={this.state.myUser} place="profile" onUpdateForm={this.fetchData} />} />
                    }
                </>
            );
        }
    }

    return MyProfileHOC;
}

export default withUserBackEnd;