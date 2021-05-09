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
            console.log(plantObject);

            const res = await updatePlant(plantObject);
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