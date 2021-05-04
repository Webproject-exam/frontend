import React, { Component } from 'react';
import Button from '../Button/Button';
import './Dashboard.css';
import DashboardPlants from './DashboardPlants';
import DashboardUsers from './DashboardUsers';
import Header from '../Header/Header';
import { AuthContext } from '../../helpers/Auth';

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
    static contextType  = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            plants: false,
            users: false
        }
    }

    componentDidMount(){
        this.context.refreshToken();
    }

    //open the form for adding a user. If the user list is shown, close it.
    togglePlants = () => {
        this.setState({
            plants: !this.state.plants,
            users: false
        });
    }

    //show a list of all users stored in the database. If the form for adding a user is open, close it.
    toggleUsers = () => {
        this.setState({
            users: !this.state.users,
            plants: false
        });
    }


    render() {

        return (
            <>
            <Header heading="Manager Page"/>
                <div className="user-list-item-buttons">
                    <Button onClick={this.togglePlants} variant="secondary-outlined" label="Plants" size="half" active={this.state.plants} />
                    <Button onClick={this.toggleUsers} variant="secondary-outlined" label="Users" size="half" active={this.state.users} />
                </div>
                {this.state.plants && <DashboardPlants />}
                {this.state.users && <DashboardUsers />}
            </>
        );
    }
}

export default Dashboard;