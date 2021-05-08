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

    componentDidMount(){
        this.sorting();
    }
    
    sorting = () => {
        const plants = this.props.plants;
        const sorting = this.state.sorting;
        let sorted;

        //sorting logic
        switch (sorting) {
            case 'fert>':
                //Imminent Fertilization
                sorted = plants.sort((a, b) => (a.fertilization.fertNext > b.fertilization.fertNext) ? 1 : -1);
                break;
            //Name A-Z
            case 'name>':
                sorted = plants.sort((a, b) => (a.name > b.name) ? 1 : -1);
                break;
            case 'name<':
                //Name Z-A
                sorted = plants.sort((a, b) => (a.name < b.name) ? 1 : -1);
                break;
            case 'watering>':
                //Imminent Watering
                sorted = plants.sort((a, b) => (a.watering.waterNext > b.watering.waterNext) ? 1 : -1);
                break;
            default:
                //Newest created plant
                sorted = plants.sort((a, b) => (a > b) ? 1 : -1);
        }
        console.log(sorted);
        
        this.setState({
            plants: sorted
        })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        this.setState({
            sorting: value
        });
        this.sorting();
    }

    render() {
        const { auth, handleWateringClick } = this.props;
        const plants = this.state.plants;

        return (
            <>
                <Header heading="Overview" />
                <select name="sorting" id="sorting" value={this.state.sorting} onChange={this.handleChange}>
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