import React, { Component } from 'react';
import AddPlantForm from '../AddPlant/AddPlantForm';
import Button from '../Button/Button';
import addUserBackend from '../HOC/AddItemFormHOC';
import plantListBackend from '../HOC/PlantListHOC';
import PlantList from '../PlantTable/PlantTable';
import Popup from '../Popup/Popup';

class DashboardPlants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addPlant: false
        }
    }

    toggleAddPlant = () => {
        this.setState({
            addPlant: !this.state.addPlant
        });
    }

    render() {
        const AddPlantWithHOC = addUserBackend(AddPlantForm);
        const PlantTableHOC = plantListBackend(PlantList);

        return (
            <>
                <PlantTableHOC />
                <Button onClick={this.toggleAddPlant} variant="fab" label=" + Add plant" size="auto" active={this.state.addPlant} />
                {this.state.addPlant &&
                    <Popup content={<AddPlantWithHOC place='plants' />} />
                }
            </>
        );
    }
}

export default DashboardPlants;