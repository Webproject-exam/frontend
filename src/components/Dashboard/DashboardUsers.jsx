import React, { Component } from 'react';
import AddUserForm from '../AddUser/AddUserForm';
import Button from '../Button/Button';
import './Dashboard.css';
import addUserBackend from '../HOC/AddItemFormHOC';
import Popup from '../Popup/Popup';

/**
 * ## How it works
 * The Dashboard component initially renders two `<Button />` components. 
 * When the user presses one of the buttons the dashboard's state changes and either a 
 * form for adding a new user (`<AddUserWithHOC />`) or a list of users (`<UserListWithHOC />`) renders.
 * 
 * - The dashboard is designed to show one component at a time.
 * 
 * - The dashboard is protected and can only be accessed by logged-in managers.
 * 
 * ## Usage
 * 1. Import the Dashboard component from `src/components/Dashboard/Dashboard`.
 * 2. Place the `<Dashboard />` component where you want the dashboard to render. 
 * (Note: ensure to protect `<Dashboard />` with authentication. Protecting with authentication 
 * is done by rendering `<Dashboard />` wrapped by `<AdminRoute></AdminRoute>` )
 */
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
                <Button onClick={this.toggleAddUser} variant="fab" label="+ Add user" size="auto" active={this.state.addUser} />
                {this.state.addUser &&
                    <Popup content={<AddUserWithHOC place="users" onAbortClick={this.toggleAddUser} />} />
                }
            </>
        );
    }
}

export default DashboardUsers;