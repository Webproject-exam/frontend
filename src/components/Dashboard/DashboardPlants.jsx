import React, { Component } from 'react';
import AddPlantForm from '../AddPlant/AddPlantForm';
import Button from '../Button/Button';
import addUserBackend from '../HOC/AddItemFormHOC';

class DashboardPlants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addPlant: false,
            seePlants: false
        }
    }

    toggleAddPlant = () => {
        this.setState({
            addPlant: !this.state.addPlant,
            seePlants: false
        });
    }

    toggleAllPlants = () => {
        this.setState({
            seePlants: !this.state.seePlants,
            addPlant: false
        });
    }

    render() {
        const AddPlantWithHOC = addUserBackend(AddPlantForm);

        return (
            <>
                <div className="user-list-item-buttons">
                    <Button onClick={this.toggleAddPlant} variant="secondary-outlined" label="Add a plant" size="half" active={this.state.addPlant} />
                    <Button onClick={this.toggleAllPlants} variant="secondary-outlined" label="See all plants" size="half" active={this.state.seePlants} />
                </div>
                {this.state.addPlant && <AddPlantWithHOC place="plants" />}
            </>
        );
    }
}

export default DashboardPlants;