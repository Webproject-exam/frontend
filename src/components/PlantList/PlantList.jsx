// https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/ Sorting
import React, { Component } from 'react';
import './PlantList.css';
import PlantListItem from '../PlantListItem/PlantListItem';
import Header from '../Header/Header'

class PlantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorting: '',
            plants: []
        }
    }

    componentDidMount() {
        this.handleUpdateProp();
        this.setState({
            sorting: sessionStorage.getItem("overview-sorting") ? sessionStorage.getItem("overview-sorting") : ''
        });
    }

    componentDidUpdate(prevProps){
        if(prevProps.plants !== this.props.plants) {
            this.handleUpdateProp();
        }
    }

    handleUpdateProp = () => {
        const sortedPlants = this.sorting(this.state.sorting, this.props.plants);
        this.setState({plants: sortedPlants});
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        this.setState({
            sorting: value
        });

        sessionStorage.setItem("overview-sorting", value);
    }

    sorting = (sorting, plants) => {
        //sorting logic
        switch (sorting) {
            case 'fert>':
                //Imminent Fertilization
                return plants.sort((a, b) => (a.fertilization.fertNext > b.fertilization.fertNext) ? 1 : -1);
            //Name A-Z
            case 'name>':
                return plants.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
            case 'name<':
                //Name Z-A
                return plants.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : -1);
            case 'watering>':
                //Imminent Watering
                return plants.sort((a, b) => (a.watering.waterNext > b.watering.waterNext) ? 1 : -1);
            default:
                //Newest created plant
                return plants.sort((a, b) => (a > b) ? 1 : -1);
        }
    }

    render() {
        const { auth, handleWateringClick } = this.props;
        const plants = this.state.plants;
        const sorting = this.state.sorting;
        this.sorting(sorting, plants);

        return (
            <>
                <Header heading="Overview" />
                <select name="sorting" id="sorting" value={this.state.sorting} onChange={this.handleChange} aria-label="Sort by">
                    <option defaultValue="">SORT BY:</option>
                    <option value="watering>">Imminent Watering</option>
                    <option value="fert>">Imminent Fertilization</option>
                    <option value="name>">Plant name A–Z</option>
                    <option value="name<">Plant name Z–A</option>
                </select>

                <ul className="plant-list">
                    {plants.map((plants) => (<PlantListItem key={plants._id} plant={plants} auth={auth} handleWateringClick={handleWateringClick} />))}
                </ul>
            </>
        );
    }
}

export default PlantList;