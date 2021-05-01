import './PlantList.css';
import PlantListItem from '../PlantListItem/PlantListItem';

function PlantList(props) {
    const { plants, selectPlant } = props;
    return (
        <ul className="plant-list">
            {plants.map((plants) => (<PlantListItem selectPlant={selectPlant} key={plants.name} plant={plants}/>))}
        </ul>
    );
}

export default PlantList;