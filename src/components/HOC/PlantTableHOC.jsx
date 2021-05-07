import React, { Component } from 'react';

function managePlantFetch(WrappedComponent) {
    class PlantTableHOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                plants: []
            }
        }
        render() { 
            return (
                <WrappedComponent />
            );
        }
    }

    return PlantTableHOC;
}

export default managePlantFetch;