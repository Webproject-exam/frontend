import React, { Component } from 'react';
import { fetchPlant } from '../../api/plants';
import { AuthContext } from '../../helpers/Auth';
import Loading from '../Loading/Loading';

const plant = {
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

function fetchPlantBackend (WrappedComponent) {
    class IndividualPlantHOC extends Component {
        static contextType = AuthContext;
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                plant: [],
                isLoading: true,
                error: null
            }
        }

        async componentDidMount(){
            this._isMounted = true;
            this.setState({
                plant: plant,
                isLoading: false,
                error: null
            });
            //await this.fetchData();
        }

        fetchData = async () => {
            const res = await fetchPlant;

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
            }
        }

        componentWillUnmount(){
            this._isMounted = false;
        }

        render() { 
            const auth = this.context.isAuth;

            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <WrappedComponent plant={this.state.plant} isAuth={auth} {...this.props} />
            );
        }
    }
    
    return IndividualPlantHOC;
}

export default fetchPlantBackend;