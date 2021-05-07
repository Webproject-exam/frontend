import React, { Component } from 'react';
import AddPlantForm from '../AddPlant/AddPlantForm';
import Button from '../Button/Button';
import addUserBackend from '../HOC/AddItemFormHOC';
import plantListBackend from '../HOC/PlantListHOC';
import PlantList from '../PlantTable/PlantTable';

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
        const PlantTableHOC = plantListBackend(PlantList);

        return (
            <>
                <Button onClick={this.toggleAddPlant} variant="fab" label=" + Add plant" size="auto" active={this.state.addPlant} />
                {this.state.addPlant && <AddPlantWithHOC place="plants" />}
                <PlantTableHOC />
            </>
        );
    }
}

export default DashboardPlants;