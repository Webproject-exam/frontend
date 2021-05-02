import React, { Component } from 'react';
//import { notifySuccess, notifyError } from '../../helpers/notification';
import IndividualPlantPage from '../IndividualPlantPage/IndividualPlantPage';
import Loading from '../Loading/Loading';
import fetchPlantBackend from './PlantPageHOC';
import { AuthContext } from '../../helpers/Auth';
import { Route } from 'react-router-dom';
import { fetchAllPlants } from '../../api/plants';

// Testing purposes
const plants = [
    {
        id: 1,
        name: "Arekapalme",
        location: "Bygg 118 - 3. etg",
        next_watering: Date.now()-222000000,
        lighting_requirements: "Average",
        fertilizer: "Masse!"
    },
    {
        id: 2,
        name: "Monstera",
        location: "Bygg 118 - 2. etg: Rom 206",
        next_watering: Date.now(),
        lighting_requirements: "Average",
        fertilizer: "Lite"
    },
    {
        id: 3,
        name: "Gullranke ampel",
        location: "Fabrikken (Bygg 115/159) - 3. etg",
        next_watering: 1620345605000,
        lighting_requirements: "Average",
        fertilizer: "Lite"
    },
    {
        id: 4,
        name: "Strelitzia nicolai",
        location: "Fabrikken (Bygg 115/159) - 3. etg",
        next_watering: Date.now()+182800000,
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