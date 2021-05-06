import React, { Component } from 'react';
//import { notifySuccess, notifyError } from '../../helpers/notification';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../helpers/Auth';
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

        componentWillUnmount() {
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