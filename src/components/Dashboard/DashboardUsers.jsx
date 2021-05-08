import React, { Component } from 'react';
import AddUserForm from '../AddUser/AddUserForm';
import Button from '../Button/Button';
import './Dashboard.css';
import addUserBackend from '../HOC/AddItemFormHOC';
import Popup from '../Popup/Popup';
class DashboardUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addUser: false
        }
    }

    //open the form for adding a user. If the user list is shown, close it.
    toggleAddUser = () => {
        this.setState({
            addUser: !this.state.addUser
        });
    }


    render() {
        const AddUserWithHOC = addUserBackend(AddUserForm);

        return (
            <>
                <Button onClick={this.toggleAddUser} variant="fab" label="+ Add user" size="auto" />
                {this.state.addUser &&
                    <Popup content={<AddUserWithHOC place="users" onAbortClick={this.toggleAddUser} onSubmit={this.props.onSubmit} />} />
                }
            </>
        );
    }
}

export default DashboardUsers;