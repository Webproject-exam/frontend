import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../helpers/Auth';
import { notifySuccess, notifyError } from '../../helpers/notification';

function withPlantsFetch(WrappedComponent){
    class PlantListHOC extends Component {
        constructor(props) {
            super(props);
            this.state = {  }
        }
        render() { 
            return (
                <WrappedComponent />
            );
        }
    }
    return PlantListHOC;
}

export default withPlantsFetch;