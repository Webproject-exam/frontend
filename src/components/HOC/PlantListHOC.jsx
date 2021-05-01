import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../helpers/Auth';
//import { notifySuccess, notifyError } from '../../helpers/notification';
import { fetchAllPlants } from '../../api/plants';
import { Route } from 'react-router-dom';
import IndividualPlantPage from '../IndividualPlantPage/IndividualPlantPage';
import fetchPlantBackend from './PlantPageHOC';

// Testing purposes
const plants = [
    {
        id: 1,
        name: "Arekapalme",
        location: "Bygg 118 - 3. etg",
        next_watering: "Today",
        lighting_requirements: "Average",
        fertilizer: "Masse!"
    },
    {
        id: 2,
        name: "Monstera",
        location: "Bygg 118 - 2. etg: Rom 206",
        next_watering: "Tomorrow",
        lighting_requirements: "Average",
        fertilizer: "Lite"
    },
    {
        id: 3,
        name: "Gullranke ampel",
        location: "Fabrikken (Bygg 115/159) - 3. etg",
        next_watering: "6 days",
        lighting_requirements: "Average",
        fertilizer: "Lite"
    },
    {
        id: 4,
        name: "Strelitzia nicolai",
        location: "Fabrikken (Bygg 115/159) - 3. etg",
        next_watering: "6 days",
        lighting_requirements: "Average",
        fertilizer: "Lite"
    }
];

function withPlantsFetch(WrappedComponent) {
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

        async componentDidMount() {
            this._isMounted = true;
            this.setState({
                plants: plants,
                isLoading: false,
                error: null,
                selectedPlant: {}
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

        setPlant = (plant) => {
            this.setState({
                selectedPlant: plant
            });
        }

        plantPage = () => {
            const IndividualPlantHOC = fetchPlantBackend(IndividualPlantPage);
            return (<IndividualPlantHOC selectedPlant={this.state.selectedPlant} />);
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        render() {
            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <>
                    <Route exact path="/plants">
                        <WrappedComponent selectPlant={this.setPlant} plants={this.state.plants} {...this.props} />
                    </Route>
                    <Route exact path="/plants/:id" render={this.plantPage} />
                </>
            );
        }
    }
    return PlantListHOC;
}

export default withPlantsFetch;