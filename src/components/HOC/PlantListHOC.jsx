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
        _id: 1,
        name: "Arekapalme",
        location: "Bygg 118 - 3. etg",
        watering: {
            waterNext: Date.now()-222000000
        },
        lighting: "Average",
        fertilization: {
            fertAmount: "Lite"
        }
    },
    {
        _id: 2,
        name: "Monstera",
        location: "Bygg 118 - 2. etg: Rom 206",
        watering: {
            waterNext: Date.now(),
        },
        lighting: "Average",
        fertilization: {
            fertAmount: "Lite"
        }
    },
    {
        _id: 3,
        name: "Gullranke ampel",
        location: "Fabrikken (Bygg 115/159) - 3. etg",
        watering: {
            waterNext: 1621257159025
        },
        lighting: "Average",
        fertilization: {
            fertAmount: "Lite"
        } 
    },
    {
        _id: 4,
        name: "Strelitzia nicolai",
        location: "Fabrikken (Bygg 115/159) - 3. etg",
        watering: {
            waterNext: Date.now()+182800000
        },
        lighting: "Average",
        fertilization: {
            fertAmount: "Lite"
        }
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
            await this.fetchData();
        }

        fetchData = async () => {
            const res = await fetchAllPlants()
            console.log(res.data);

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
            console.log(this.state.selectedPlant);
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
                    <Route exact path="/plants/:_id" render={this.plantPage} />
                </>
            );
        }
    }
    return PlantListHOC;
}

export default withPlantsFetch;