import React, { Component } from 'react';
import AddPlantForm from '../AddPlant/AddPlantForm';
import Button from '../Button/Button';
import addUserBackend from '../HOC/AddItemFormHOC';
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

        return (
            <>
                <Button onClick={this.toggleAddPlant} variant="fab" label=" + Add plant" size="auto" />
                {this.state.addPlant &&
                    <Popup content={<AddPlantWithHOC place='plants' onAbortClick={this.toggleAddPlant} onSubmit={this.props.onSubmit} />} />
                }
            </>
        );
    }
}

export default DashboardPlants;