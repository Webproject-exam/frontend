import React, { Component } from 'react';
//import { notifySuccess, notifyError } from '../../helpers/notification';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../helpers/Auth';
import { Route } from 'react-router-dom';
import { addDays, startOfDay } from 'date-fns'
import { fetchAllPlants } from '../../api/plants';

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
            await this.fetchAllData();
        }

        componentWillUnmount() {
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

        //TO DO: koble sammen denne med back-end (PATCH plante med ID)
        //TO DO 2: be om bekreftelse fra bruker 
        handleWateringClick = (plant) => {
            let nextWateringDate = startOfDay(addDays(Date.now(), plant.watering.waterFrequency))

            //denne datoen skal bli waterNext til planten med tilhørende ID (plant._id her)
            console.log(`Plante med id ${plant._id} sin waterNext skal bli: ${nextWateringDate}`)
        }

        render() {
            const auth = this.context.isAuth;

            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <>
                    <Route exact path="/plants">
                        <WrappedComponent plants={this.state.plants} auth={auth} handleWateringClick={this.handleWateringClick} {...this.props} />
                    </Route>
                </>
            );
        }
    }
    return PlantListHOC;
}

export default withPlantsFetch;