import React, { Component } from 'react';
import Loading from '../Loading/Loading';

function managePlantFetch(WrappedComponent) {
    class PlantTableHOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                plants: [],
                isLoading: true,
                selectedPlant: {}
            }
        }

        fetchAllPlants = () => {
            
        }

        render() { 
            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <WrappedComponent />
            );
        }
    }

    return PlantTableHOC;
}

export default managePlantFetch;