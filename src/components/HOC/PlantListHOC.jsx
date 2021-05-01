import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../helpers/Auth';
//import { notifySuccess, notifyError } from '../../helpers/notification';
import { fetchAllPlants } from '../../api/plants';

// Testing purposes
const plants = [
    {
        name: "Arekapalme",
        location: "Bygg 118 - 3. etg",
        next_watering: "Today",
        lighting_requirements: "Average",
        fertilizer: "Masse!"
    },
    {
        name: "Monstera",
        location: "Bygg 118 - 2. etg: Rom 206",
        next_watering: "Tomorrow",
        lighting_requirements: "Average",
        fertilizer: "Lite"
    },
    {
        name: "Gullranke ampel",
        location: "Fabrikken (Bygg 115/159) - 3. etg",
        next_watering: "6 days",
        lighting_requirements: "Average",
        fertilizer: "Lite"
    },
    {
        name: "Strelitzia nicolai",
        location: "Fabrikken (Bygg 115/159) - 3. etg",
        next_watering: "6 days",
        lighting_requirements: "Average",
        fertilizer: "Lite"
    }
];

function withPlantsFetch(WrappedComponent){
    class PlantListHOC extends Component {
        static contextType = AuthContext;
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                plants: [],
                isLoading: true,
                error: null,
                selectedPlant: {}
            }
        }

        async componentDidMount(){
            this._isMounted = true;
            this.setState({
                plants: plants,
                isLoading: false,
                error: null
            });
            //await this.fetchData();
        }

        fetchData = async () => {
            const res = await fetchAllPlants()

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

        componentWillUnmount(){
            this._isMounted = false;
        }

        render() { 
            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <WrappedComponent plants={this.state.plants} {...this.props} />
            );
        }
    }
    return PlantListHOC;
}

export default withPlantsFetch;