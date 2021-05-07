import React, { Component } from 'react';
import { fetchAllPlants } from '../../api/plants';
import Loading from '../Loading/Loading';

function managePlantFetch(WrappedComponent) {
    class PlantTableHOC extends Component {
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                plants: [],
                isLoading: true,
                selectedPlant: {},
                error: null
            }
        }
        componentDidMount(){
            this._isMounted = true;
            this.fetchAllData();
        }

        componentWillUnmount(){
            this._isMounted = false;
        }

        fetchAllData = async () => {
            const res = await fetchAllPlants();

            if (res.error) {
                this._isMounted && this.setState({
                    error: res.error
                })
            } else {
                this._isMounted && this.setState({
                    plants: res.data,
                    isLoading: false,
                    error: null
                })
            }
        }

        render() { 
            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <WrappedComponent plants={this.state.plants} />
            );
        }
    }

    return PlantTableHOC;
}

export default managePlantFetch;