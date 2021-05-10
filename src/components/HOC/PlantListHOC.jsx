import React, { Component } from 'react';
import { notifyError, notifySuccess, notifyInfo } from '../../helpers/notification';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../helpers/Auth';
import { addDays, startOfDay, isWeekend, format, isToday, parseISO, isPast } from 'date-fns'
import { fetchAllPlants, careForPlant } from '../../api/plants';
import Popup from '../Popup/Popup';
import Prompt from '../Prompt/Prompt';
import Favicon from 'react-favicon';

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
                selectedPlant: {},
                nextWaterDate: '',
                dateWasMoved: false,
                waterPlant: false
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

        waterNextClick = (plant) => {
            let nextWateringDate = startOfDay(addDays(Date.now(), plant.watering.waterFrequency))
            let dateWasMoved = false;

            //Hvis WaterNext er i helgen, flytt den til nærmeste mandag
            while (isWeekend(nextWateringDate)) {
                dateWasMoved = true
                nextWateringDate = addDays(nextWateringDate, 1)
            }

            this.setState({
                selectedPlant: plant,
                nextWaterDate: nextWateringDate,
                dateWasMoved: dateWasMoved,
                waterPlant: true
            });
        }

        waterPlant = async () => {
            const watering = {
                selectedPlant: this.state.selectedPlant._id,
                waterNext: this.state.nextWaterDate
            };

            const res = await careForPlant(watering);

            if (res.error) {
                notifyError("Oops, something went wrong!");
                this.setState({
                    error: res.error
                })
            } else {
                this.fetchAllData();

                if (this.state.dateWasMoved) {
                    notifyInfo(`The next watering date for the plant "${this.state.selectedPlant.name}" fell on the weekend. The system, therefore, moved the date to  ${format(this.state.nextWaterDate, 'EEEE, MMMM do')}`)
                }

                notifySuccess(`The plant "${this.state.selectedPlant.name}" has been watered. 💧`);
                this.setState({
                    waterPlant: false,
                    selectedPlant: {},
                    nextWaterDate: '',
                    dateWasMoved: false
                });
            };
        }

        cancelWatering = () => {
            this.setState({
                waterPlant: false,
                selectedPlant: {},
                nextWaterDate: '',
                dateWasMoved: false
            });
        }

        countPlantsToBeWatered = () => {
            let plantsToBeWatered = 0;
            Object.values(this.state.plants).forEach(plant =>
                (isToday(parseISO(plant.watering.waterNext)) || isPast(parseISO(plant.watering.waterNext))) ? plantsToBeWatered++ : null);
            return plantsToBeWatered;
        }

        render() {
            const auth = this.context.isAuth;

            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <>
                    {/* NÅR MAN DEPLOYER MÅ DENNE URLEN ENDRES (tror jeg tihi) */}
                    
                    {auth && <Favicon url={`${process.env.REACT_APP_FRONTEND}/favicon.ico`} alertCount={this.countPlantsToBeWatered()} />}
                    
                    <WrappedComponent plants={this.state.plants} auth={auth} handleWateringClick={this.waterNextClick} {...this.props} />
                    
                    {this.state.waterPlant &&
                        <Popup content={<Prompt action='water' plant={this.state.selectedPlant} onCancelClick={this.cancelWatering} onConfirmClick={this.waterPlant} />} />
                    }
                </>
            );
        }
    }
    return PlantListHOC;
}

export default withPlantsFetch;