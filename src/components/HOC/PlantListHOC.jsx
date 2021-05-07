import React, { Component } from 'react';
import { notifyError, notifySuccess } from '../../helpers/notification';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../helpers/Auth';
import { addDays, startOfDay, isWeekend } from 'date-fns'
import { fetchAllPlants, waterPlant } from '../../api/plants';
import Popup from '../Popup/Popup';
import Prompt from '../Prompt/Prompt';

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
            console.log(plant);
            let nextWateringDate = startOfDay(addDays(Date.now(), plant.watering.waterFrequency))
            let dateWasMoved = false;
            console.log(nextWateringDate);

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
            console.log(watering);

            const res = await waterPlant(watering);

            if(res.error){
                console.log("Something went fucking wrong!");
                notifyError("Oops, something went wrong!");
                this.setState({
                    error: res.error
                })
            } else {
                this.fetchAllData();
                notifySuccess("Plant has been watered!");
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

        render() {
            const auth = this.context.isAuth;

            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <>
                    <WrappedComponent plants={this.state.plants} auth={auth} handleWateringClick={this.waterNextClick} {...this.props} />
                    {this.state.waterPlant &&
                        <Popup content={<Prompt type='confirm' plant={this.state.selectedPlant} onCancelClick={this.cancelWatering} onConfirmClick={this.waterPlant} />} />
                    }
                </>
            );
        }
    }
    return PlantListHOC;
}

export default withPlantsFetch;