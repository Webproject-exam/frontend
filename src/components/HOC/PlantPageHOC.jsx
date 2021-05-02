import React, { Component } from 'react';
import { fetchPlant } from '../../api/plants';
import { AuthContext } from '../../helpers/Auth';
import Loading from '../Loading/Loading';

const plant = {
    id: 1,
    name: "Arkapalme",
    placement: {
        building: "Fabrikken (Bygg 115/159)",
        floor: "2. etg",
        room: "Rom 206"
    },
    watering: {
        frequency: 1209600000,
        next: Date.now(),
        responsible: "Ola Nordmann",
        last_watered_by: "Kari Nordmann",
        last_watered_date: "5. april 2021", //ikke lagt til i card-et enna
        last_postponed: 1619275200000,
        postponed_reason: "still moist"
    },
    fertilization: {
        frequency: 5184000000,
        next: Date.now()+5144000000
    },
    ligtning: "Average",
    added: 1604275200000
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
            const plantId = this.props.selectedPlant;
            console.log(plantId);
            this._isMounted = true;
            this.setState({
                plant: plant,
                isLoading: false,
                error: null
            });
            //await this.fetchData(plantId);
        }

        fetchData = async (id) => {
            const res = await fetchPlant(id);

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