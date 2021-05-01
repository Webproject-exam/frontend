import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../helpers/Auth';
//import { notifySuccess, notifyError } from '../../helpers/notification';
import { fetchAllPlants, fetchPlant } from '../../api/plants';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import IndividualPlantPage from '../IndividualPlantPage/IndividualPlantPage';

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

const plant = {
    id: 1,
    name: "Arkapalme",
    placement: {
        building: "Fabrikken (Bygg 115/159)",
        floor: "2. etg",
        room: "Rom 206"
    },
    watering: {
        frequency: "every 14 days",
        next: "3 days",
        responsible: "Ola Nordmann",
        last_watered_by: "Kari Nordmann",
        last_watered_date: "5. april 2021",
        last_postponed: "2. april 2021",
        postponed_reason: "still moist"
    },
    fertilization: {
        frequency: "every 60 days",
        next: "27 days"
    },
    ligtning: "Average",
    added: "1. jan 2020"
}

function withPlantsFetch(WrappedComponent) {
    class PlantListHOC extends Component {
        static contextType = AuthContext;
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                plants: [],
                plant: [],
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

        fetchPlant = async () => {
            this.setState({
                plant: plant
            })
            /* const res = await fetchPlant();

            if (res.error) {
                this._isMounted && this.setState({
                    error: res.error
                })
            } else {
                this._isMounted && this.setState({
                    plant: res.data,
                    isLoading: false,
                    error: null
                })
            } */
        }

        setPlant = (plant) => {
            this.setState({
                selectedPlant: plant
            })
            this.fetchPlant();
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        render() {
            const auth = this.context.isAuth;

            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <>
                    <Route exact path="/plants">
                        <WrappedComponent selectPlant={this.setPlant} plants={this.state.plants} {...this.props} />
                        {this.state.plants.map(plants => (<Link to={'plants/' + plants.id} />))}

                        <Route path="plants/:id" component={<IndividualPlantPage plant={this.state.plant} isAuth={auth} />} />
                    </Route>

                </>
            );
        }
    }
    return PlantListHOC;
}

export default withPlantsFetch;