import React, { Component } from 'react';
import Button from '../Button/Button';
import './Dashboard.css';
import DashboardPlants from './DashboardPlants';
import DashboardUsers from './DashboardUsers';
import Header from '../Header/Header';
import { AuthContext } from '../../helpers/Auth';
import PlantList from '../PlantTable/PlantTable';
import plantListBackend from '../HOC/PlantTableHOC';
import withUsersFetch from '../HOC/UserTableHOC';
import UserTable from '../UserTable/UserTable';
class Dashboard extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            plants: true,
            users: false
        }
        this.plant = React.createRef();
        this.user = React.createRef();
    }

    //open the form for adding a user. If the user list is shown, close it.
    toggleTab = () => {
        this.setState({
            plants: !this.state.plants,
            users: !this.state.users
        });
    }

    onSubmit = (place) => {
        if (place === 'users'){
            this.user.current.fetchData();
        } else if (place === 'plants') {
            this.plant.current.fetchData();
        }
    }

    render() {
        const PlantTableHOC = plantListBackend(PlantList);
        const UserTableWithHOC = withUsersFetch(UserTable);

        return (
            <>
                <Header heading="Manager Page" />
                <div className="user-list-item-buttons">
                    <Button onClick={this.toggleTab} variant="text-only-tab" label="Plants" size="auto" active={this.state.plants} />
                    <Button onClick={this.toggleTab} variant="text-only-tab" label="Users" size="auto" active={this.state.users} />
                </div>
                {this.state.plants &&
                    <>
                        <DashboardPlants onSubmit={this.onSubmit} />
                        <PlantTableHOC place='plants' ref={this.plant} />
                    </>
                }
                {this.state.users && 
                <>
                    <DashboardUsers onSubmit={this.onSubmit} />
                    <UserTableWithHOC ref={this.user} />
                </>
                }
            </>
        );
    }
}

export default Dashboard;