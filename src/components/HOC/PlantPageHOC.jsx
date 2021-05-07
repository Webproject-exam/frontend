import React, { Component } from 'react';
import { fetchPlant } from '../../api/plants';
import { AuthContext } from '../../helpers/Auth';
import Loading from '../Loading/Loading';
import { withRouter, Redirect } from 'react-router-dom';
import { addDays, startOfDay } from 'date-fns';
import { notifySuccess } from '../../helpers/notification';
import Postpone from '../Postpone/Postpone';

function fetchPlantBackend(WrappedComponent) {
    class IndividualPlantHOC extends Component {
        static contextType = AuthContext;
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                plantId: '',
                plant: [],
                isLoading: true,
                error: null,
                redirect: '',
                isPostponing: false,
                postponingType: ''
            }
        }

        async componentDidMount() {
            this._isMounted = true;
            const id = this.props.match.params.id;
            await this.fetchData(id);
        }

        fetchData = async (id) => {
            try {
                const res = await fetchPlant(id);
                console.log(res);
                if (res.error) {
                    this._isMounted && this.setState({
                        error: res.error
                    })
                } else {
                    this._isMounted && this.setState({
                        plant: res.data.plant,
                        isLoading: false,
                        error: null
                    })
                }
            } catch (error) {
                console.log(error.response.data);
                this._isMounted && this.setState({
                    redirect: '/notfound'
                })
            }
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        handleWateringClick = () => {
            let nextWateringDate = startOfDay(addDays(Date.now(), this.state.plant.watering.waterFrequency))

            if (window.confirm(`Do you want to water the plant "${this.state.plant.name}"?`)) {

                //denne datoen skal bli waterNext til planten med tilhørende ID (plant._id her)
                console.log(`Plante med id "${this.state.plantId}" sin waterNext skal bli: "${nextWateringDate}"`)

                notifySuccess(`The plant "${this.state.plant.name}" has been watered. 💧`)
            }
        }

        handlefertilizationClick = () => {
            let nextFertilizationDate = startOfDay(addDays(Date.now(), this.state.plant.fertilization.fertFrequency))

            if (window.confirm(`Do you want to fertilize the plant "${this.state.plant.name}"?`)) {

                //denne datoen skal bli fertNext til planten med tilhørende ID (plant._id her)
                console.log(`Plante med id "${this.state.plantId}" sin fertNext skal bli: "${nextFertilizationDate}"`)

                notifySuccess(`The plant "${this.state.plant.name}" has been fertilized. 🌱`)
            }
        }

        handlePostponeClick = (type) => {
            this.setState({
                isPostponing: true,
                postponingType: type
            });
        }

        render() {
            const auth = this.context.isAuth;
            if (this.state.redirect) {
                return (<Redirect to={this.state.redirect} />)
            }

            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <>
                    <WrappedComponent
                        plant={this.state.plant}
                        isAuth={auth}
                        handleWateringClick={this.handleWateringClick}
                        handlefertilizationClick={this.handlefertilizationClick}
                        handlePostponeClick={this.handlePostponeClick}
                        {...this.props} />

                    {this.state.isPostponing &&

                        <Postpone type={this.state.postponingType} name={this.state.plant.name}/>}
                </>
            );
        }
    }

    return withRouter(IndividualPlantHOC);
}

export default fetchPlantBackend;