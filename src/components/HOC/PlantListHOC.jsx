import React, { Component } from 'react';
import { notifySuccess } from '../../helpers/notification';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../helpers/Auth';
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
        //TO DO 2: be om bekreftelse fra bruker før planten patches
        handleWateringClick = (plant) => {
            let nextWateringDate = startOfDay(addDays(Date.now(), plant.watering.waterFrequency))

            if (window.confirm(`Do you want to water the plant "${plant.name}"?`)) {
                
                //denne datoen skal bli waterNext til planten med tilhørende ID (plant._id her)
                console.log(`Plante med id "${plant._id}" sin waterNext skal bli: "${nextWateringDate}"`)

                notifySuccess(`The plant "${plant.name}" has been watered. 💧`)
              }
        }

        render() {
            const auth = this.context.isAuth;

            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <WrappedComponent plants={this.state.plants} auth={auth} handleWateringClick={this.handleWateringClick} {...this.props} />
            );
        }
    }
    return PlantListHOC;
}

export default withPlantsFetch;