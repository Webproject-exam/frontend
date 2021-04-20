import React, { Component } from 'react';
import AddUserForm from '../AddUser/AddUserForm';
import Button from '../Button/Button'
import UserList from '../UserList/UserList';
import './Dashboard.css';
import addUserBackend from '../HOC/AddUserFormHOC';
import withUsersFetch from '../HOC/UserListHOC';

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
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addUser: false,
            seeUsers: false
        }
    }

    //open the form for adding a user. If the user list is shown, close it.
    toggleAddUser = () => {
        this.setState({
            addUser: !this.state.addUser,
            seeUsers: false
        });
    }

    //show a list of all users stored in the database. If the form for adding a user is open, close it.
    toggleAllUsers = () => {
        this.setState({
            seeUsers: !this.state.seeUsers,
            addUser: false
        });
    }


    render() {
        const UserListWithHOC = withUsersFetch(UserList);
        const AddUserWithHOC = addUserBackend(AddUserForm);

        return (
            <>
                <div className="user-list-item-buttons">
                    <Button onClick={this.toggleAddUser} variant="secondary-outlined" label="Add a user" size="half" active={this.state.addUser} />
                    <Button onClick={this.toggleAllUsers} variant="secondary-outlined" label="See all users" size="half" active={this.state.seeUsers} />
                </div>
                {this.state.addUser && <AddUserWithHOC />}
                {this.state.seeUsers && <UserListWithHOC />}
            </>
        );
    }
}

export default Dashboard;