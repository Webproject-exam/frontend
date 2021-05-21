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
            const res = await updatePlant(plantObject);

            if (res.error) {
                this.setState({
                    error: res.error
                });
            } else {
                this.props.onSubmit();
            }
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