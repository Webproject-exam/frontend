import React, { Component } from 'react';

function updatePlantBackend(WrappedComponent) {
    class UpdatePlantHOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                error: null
            }
        }

        handleSubmit = (plantObject) => {
            console.log(plantObject);
        }

        render() { 
            return (
                <WrappedComponent
                    selectedPlant={this.props.selectedPlant}
                    onSubmit={this.handleSubmit}
                    onCancelClick={this.props.onCancelClick}
                    error={this.state.error}
                />
            );
        }
    }
    return UpdatePlantHOC;
}

export default updatePlantBackend;