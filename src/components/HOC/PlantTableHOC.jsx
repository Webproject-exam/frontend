import React, { Component } from 'react';
import { fetchAllPlants } from '../../api/plants';
import Loading from '../Loading/Loading';
import Popup from '../Popup/Popup';
import Prompt from '../Prompt/Prompt';

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
            this.fetchAllData();
        }

        componentWillUnmount(){
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

        editPlant = (plant) => {
            console.log(plant);
        }

        deletePlant = (plant) => {
            console.log(plant);
			this.setState({
				selectedPlant: plant,
				delete: true
			});
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
                    <WrappedComponent plants={this.state.plants} handleEditClick={this.editPlant} handleDeleteClick={this.deletePlant} />
                    {this.state.edit &&
                        <Popup  />
                    }
					{this.state.delete &&
						<Popup content={<Prompt action='delete' plant={this.state.selectedPlant} onCancelClick={this.cancelDelete} />} />
					}
                </>
            );
        }
    }

    return PlantTableHOC;
}

export default managePlantFetch;