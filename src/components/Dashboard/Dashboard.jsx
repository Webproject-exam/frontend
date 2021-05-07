import React, { Component } from 'react';
import Button from '../Button/Button';
import './Dashboard.css';
import DashboardPlants from './DashboardPlants';
import DashboardUsers from './DashboardUsers';
import Header from '../Header/Header';
import { AuthContext } from '../../helpers/Auth';
import PlantList from '../PlantTable/PlantTable';
import plantListBackend from '../HOC/PlantListHOC';

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
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            plants: true,
            users: false
        }
    }

    componentDidMount() {
        this.context.refreshToken();
    }

    //open the form for adding a user. If the user list is shown, close it.
    toggleTab = () => {
        this.setState({
            plants: !this.state.plants,
            users: !this.state.users
        });
    }

    render() {
        const PlantTableHOC = plantListBackend(PlantList);

        return (
            <>
                <Header heading="Manager Page" />
                <div className="user-list-item-buttons">
                    <Button onClick={this.toggleTab} variant="text-only-tab" label="Plants" size="auto" active={this.state.plants} />
                    <Button onClick={this.toggleTab} variant="text-only-tab" label="Users" size="auto" active={this.state.users} />
                </div>
                {this.state.plants &&
                    <>
                        <DashboardPlants />
                        <PlantTableHOC place='plants' />
                    </>
                }
                {this.state.users && <DashboardUsers />}
            </>
        );
    }
}

export default Dashboard;