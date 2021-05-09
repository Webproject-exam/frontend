import React, { Component } from 'react';
import { deletePlant, fetchAllPlants } from '../../api/plants';
import Loading from '../Loading/Loading';
import Popup from '../Popup/Popup';
import Prompt from '../Prompt/Prompt';
import { notifySuccess, notifyError } from '../../helpers/notification';

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
                notifySuccess(`Plant ${this.state.selectedPlant.name} was successfully deleted!`);
                this.setState({
                    selectedPlant: {},
                    delete: false
                });
                this.fetchData();
            }
        }

		cancelDelete = () => {
			this.setState({
				delete: false
			});
		}

        render() { 
            if (this.state.isLoading) {
                return (<Loading />);
            }

            return (
                <>
                    <WrappedComponent plants={this.state.plants} handleEditClick={this.editPlant} handleDeleteClick={this.selectDelete} />
                    {this.state.edit &&
                        <Popup  />
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