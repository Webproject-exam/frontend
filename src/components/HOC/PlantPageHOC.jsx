import React, { Component } from 'react';
import { fetchPlant, postponePlant, careForPlant, requestCare } from '../../api/plants';
import { AuthContext } from '../../helpers/Auth';
import Loading from '../Loading/Loading';
import { withRouter, Redirect } from 'react-router-dom';
import { addDays, startOfDay, parseISO, isWeekend, format, nextMonday } from 'date-fns';
import { notifyError, notifyInfo, notifySuccess } from '../../helpers/notification';
import Postpone from '../Postpone/Postpone';
import Popup from '../Popup/Popup';
import Prompt from '../Prompt/Prompt';

function fetchPlantBackend(WrappedComponent) {
    class IndividualPlantHOC extends Component {
        static contextType = AuthContext;
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                plant: [],
                isLoading: true,
                error: null,
                redirect: '',
                isPostponing: false,
                postponingType: '',
                waterPlant: false
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
                if (res.data.plant === null) {
                    this._isMounted && this.setState({
                        error: res.error,
                        redirect: '/notfound'
                    })
                } else {
                    this._isMounted && this.setState({
                        plant: res.data.plant,
                        isLoading: false,
                        error: null
                    })
                }
            } catch (error) {
                this._isMounted && this.setState({
                    redirect: '/notfound'
                })
            }
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        handleWateringClick = async () => {
            let nextWateringDate = startOfDay(addDays(Date.now(), this.state.plant.watering.waterFrequency))
            let dateWasMoved = false;

            //If the waterNextDate is on a weekend, move it to the closest monday
            if (isWeekend(nextWateringDate)) {
                nextWateringDate = nextMonday(nextWateringDate)
                dateWasMoved = true
            }

            const payload = {
                selectedPlant: this.state.plant._id,
                waterNext: nextWateringDate
            }

            const res = await careForPlant(payload);

            if (res.error) {
                notifyError("Oops, something went wrong!");
                this.setState({
                    error: res.error
                })
            } else {
                
                if(dateWasMoved){
                    notifyInfo(`The next watering date for the plant "${this.state.plant.name}" fell on the weekend. The system, therefore, moved the date to  ${format(nextWateringDate, 'EEEE, MMMM do')}`)
                }

                notifySuccess(`The plant "${this.state.plant.name}" has been watered. 💧`);

                this.setState({
                    plant: [],
                    isLoading: true,
                    waterPlant: false
                });
                const id = this.props.match.params.id;
                this.fetchData(id);
            };
        }

        handleFertilizationClick = async () => {
            let nextFertilizationDate = startOfDay(addDays(Date.now(), this.state.plant.fertilization.fertFrequency))
            let dateWasMoved = false;

            //If the waterNextDate is on a weekend, move it to the closest monday
            while (isWeekend(nextFertilizationDate)) {
                dateWasMoved = true
                nextFertilizationDate = addDays(nextFertilizationDate, 1)
            }
            
            const payload = {
                selectedPlant: this.state.plant._id,
                fertNext: nextFertilizationDate
            }

            console.log(payload);

            const res = await careForPlant(payload);

            if (res.error) {
                notifyError("Oops, something went wrong!");
                this.setState({
                    error: res.error
                })
            } else {
                
                if(dateWasMoved){
                    notifyInfo(`The next fertilize date for the plant "${this.state.plant.name}" fell on the weekend. The system, therefore, moved the date to  ${format(nextFertilizationDate, 'EEEE, MMMM do')}`)
                }

                notifySuccess(`The plant "${this.state.plant.name}" has been fertilized. 🌱`);
                this.setState({
                    plant: [],
                    isLoading: true,
                    fertPlant: false
                });
                const id = this.props.match.params.id;
                this.fetchData(id);
            };
        }

        handlePostponeClick = (type) => {
            this.setState({
                isPostponing: !this.state.isPostponing,
                postponingType: type
            });
        }

        onPostpone = async (postponeObject) => {
            let { days_postponement, reason_postponement } = postponeObject;

            let payload;
            let postponeResultDate;

            if (this.state.postponingType === 'watering') {
                postponeResultDate = startOfDay(addDays(parseISO(this.state.plant.watering.waterNext), days_postponement));
                payload = {
                    waterNext: postponeResultDate,
                    lastPostponedReason: reason_postponement
                };
            } else if (this.state.postponingType === 'fertilization') {
                postponeResultDate = startOfDay(addDays(parseISO(this.state.plant.fertilization.fertNext), days_postponement));
                payload = {
                    fertNext: postponeResultDate,
                    lastPostponedReason: reason_postponement
                }
            }

            console.log(payload);

            const id = this.state.plant._id;

            const res = await postponePlant(id, payload);

            if (res.error) {
                this.setState({ error: res.error });
            } else {
                this.setState({
                    isPostponing: false,
                })
                notifySuccess(`The next ${this.state.postponingType} date for "${this.state.plant.name}" has been postponed to ${format(postponeResultDate, 'EEEE, MMMM do')}`);
                this.fetchData(id);
            }
        }

        handleRequestClick = async (plantID) => {
            console.log(`Someone has requested care for the plant with ID ${plantID}`);
            const date = startOfDay(Date.now());
            const res = await requestCare({id: plantID, date});

            if(res.error) {
                notifyError("Someone has already requested watering for that plant!");
                this.setState({
                    error: res.error
                });
            } else {
                notifySuccess("An email to the gardeners has been sent!")
                this.fetchData(this.state.plant._id);
            }
        }

        toggleWatering = () => {
            this.setState({
                waterPlant: !this.state.waterPlant
            });
        }

        toggleFertilizer = () => {
            this.setState({
                fertPlant: !this.state.fertPlant
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
                        handleWateringClick={this.toggleWatering}
                        handlefertilizationClick={this.toggleFertilizer}
                        handlePostponeClick={this.handlePostponeClick}
                        handleRequestClick={this.handleRequestClick}
                        {...this.props} />

                    {this.state.waterPlant &&
                        <Popup content={<Prompt action='water' plant={this.state.plant} onCancelClick={this.toggleWatering} onConfirmClick={this.handleWateringClick} />} />
                    }

                    {this.state.fertPlant &&
                        <Popup content={<Prompt action='fertilize' plant={this.state.plant} onCancelClick={this.toggleFertilizer} onConfirmClick={this.handleFertilizationClick} />} />
                    }

                    {this.state.isPostponing &&
                        <Popup content={
                            <Postpone
                                type={this.state.postponingType}
                                name={this.state.plant.name}
                                onCancelClick={this.handlePostponeClick}
                                onSubmit={this.onPostpone} />
                        } />
                    }
                </>
            );
        }
    }

    return withRouter(IndividualPlantHOC);
}

export default fetchPlantBackend;