// https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/ Sorting
import React, { Component } from 'react';
import './PlantList.css';
import PlantListItem from '../PlantListItem/PlantListItem';
import Header from '../Header/Header'

class PlantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorting: 'watering>',
            plants: []
        }
    }

    componentDidMount() {
        const plants = this.props.plants;
        this.setState({
            plants: plants
        })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        this.setState({
            sorting: value
        });
    }

    render() {
        const { auth, handleWateringClick } = this.props;
        const plants = this.state.plants;
        const sorting = this.state.sorting;
        switch (sorting) {
            case 'fert>':
                plants.sort((a, b) => (a.fertilization.fertNext > b.fertilization.fertNext) ? 1 : -1);
                break;
            case 'name>':
                plants.sort((a, b) => (a.name > b.name) ? 1 : -1);
                break;
            case 'name<':
                plants.sort((a, b) => (a.name < b.name) ? 1 : -1);
                break;
            default:
                plants.sort((a, b) => (a.watering.waterNext > b.watering.waterNext) ? 1 : -1);
        }

        return (
            <>
                <Header heading="Overview" />
                <select name="sorting" id="sorting" value={this.state.sorting} onChange={this.handleChange}>
                    <option defaultValue="watering>">Imminent Watering</option>
                    <option value="fert>">Imminent Fertilization</option>
                    <option value="name>">Name A-Z</option>
                    <option value="name<">Name Z-A</option>
                </select>

                <ul className="plant-list">
                    {plants.map((plants) => (<PlantListItem key={plants._id} plant={plants} auth={auth} handleWateringClick={handleWateringClick} />))}
                </ul>
            </>
        );
    }
}

export default PlantList;