import React, { Component } from 'react';
import { updatePlant } from '../../api/plants';

function updatePlantBackend(WrappedComponent) {
    class UpdatePlantHOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                error: null
            }
        }

        handleSubmit = async (plantObject) => {
            const id = this.props.selectedPlant._id;
            const {
                name,
                fertilization,
                information,
                lighting,
                placement,
                watering
            } = plantObject;
            const { fertAmount, fertFrequency, fertNext } = fertilization;
            const { waterAmount, waterFrequency, waterNext } = watering;
            const payload = {
                id,
                name,
                information,
                lighting,
                fertAmount,
                fertFrequency,
                fertNext,
                placement,
                waterAmount,
                waterFrequency,
                waterNext
            }
            console.log(payload);

            const res = await updatePlant(payload);
            console.log(res);
        }

        render() { 
            return (
                <WrappedComponent
                    selectedPlant={this.props.selectedPlant}
                    onSubmitHandler={this.handleSubmit}
                    onCancelClick={this.props.onCancelClick}
                    error={this.state.error}
                />
            );
        }
    }
    return UpdatePlantHOC;
}

export default updatePlantBackend;