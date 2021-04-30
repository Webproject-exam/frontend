import './PlantList.css';
import PlantListItem from '../PlantListItem/PlantListItem';

function PlantList({plants}) {
    return (
        <ul className="plant-list">
            {plants.map((plants) => (<PlantListItem key={plants.name} plant={plants}/>))}
        </ul>
    );
}

export default PlantList;