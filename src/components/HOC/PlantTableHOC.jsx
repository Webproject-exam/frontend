import React, { Component } from 'react';
import { deletePlant, fetchAllPlants } from '../../api/plants';
import Loading from '../Loading/Loading';
import Popup from '../Popup/Popup';
import Prompt from '../Prompt/Prompt';
import { notifySuccess, notifyError } from '../../helpers/notification';
import updatePlantBackend from './UpdatePlantHOC';
import UpdatePlantForm from '../UpdatePlant/UpdatePlant';
import { isPast, isToday, parseISO } from 'date-fns';
import Favicon from 'react-favicon';

function managePlantFetch(WrappedComponent) {
    class PlantTableHOC extends Component {
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                plants: [],
                isLoading: true,
                selectedPlant: {},
                error: null,
                edit: false,
                delete: false
            }
        }
        componentDidMount(){
            this._isMounted = true;
            this.fetchData();
        }

        componentWillUnmount(){
            this._isMounted = false;
        }

        fetchData = async () => {
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

        editPlant = (plant) => {
            console.log(plant);
            this.setState({
                selectedPlant: plant,
                edit: true
            });
        }

        cancelEdit = () => {
            this.setState({
                selectedPlant: {},
                edit: false
            });
        }

        selectDelete = (plant) => {
			this.setState({
				selectedPlant: plant,
				delete: true
			});
        }

        deletePlant = async () => {
            const id = this.state.selectedPlant._id;
            const res = await deletePlant({id});
            
            if (res.error) {
                this.setState({
                    error: res.error
                });
                notifyError("Something went wrong during deletion, please try again!");
            } else {
                notifySuccess(`The plant ${this.state.selectedPlant.name} has been deleted. 🗑️`);
                this.setState({
                    selectedPlant: {},
                    delete: false
                });
                this.fetchData();
            }
        }

		cancelDelete = () => {
			this.setState({
                selectedPlant: {},
				delete: false
			});
		}

        countPlantsToBeWatered = () => {
            let plantsToBeWatered = 0;
            Object.values(this.state.plants).forEach(plant =>
                (isToday(parseISO(plant.watering.waterNext)) || isPast(parseISO(plant.watering.waterNext))) ? plantsToBeWatered++ : null);
            return plantsToBeWatered;
        }

        render() { 
            const UpdatePlantHOC = updatePlantBackend(UpdatePlantForm);
            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <>
                    <Favicon url={`${process.env.REACT_APP_FRONTEND}/favicon.ico`} alertCount={this.countPlantsToBeWatered()} />
                    <WrappedComponent plants={this.state.plants} handleEditClick={this.editPlant} handleDeleteClick={this.selectDelete} />
                    {this.state.edit &&
                        <Popup content={<UpdatePlantHOC selectedPlant={this.state.selectedPlant} onCancelClick={this.cancelEdit} onSubmit={this.fetchData} />}  />
                    }
					{this.state.delete &&
						<Popup content={<Prompt action='delete' plant={this.state.selectedPlant} onCancelClick={this.cancelDelete} onConfirmClick={this.deletePlant} />} />
					}
                </>
            );
        }
    }

    return PlantTableHOC;
}

export default managePlantFetch;