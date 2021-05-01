import './PlantList.css';
import PlantListItem from '../PlantListItem/PlantListItem';
import Header from '../Header/Header'

function PlantList(props) {
    const { plants, selectPlant } = props;
    return (
        <>
            <Header heading="Overview"/>
            <ul className="plant-list">
                {plants.map((plants) => (<PlantListItem selectPlant={selectPlant} key={plants.name} plant={plants}/>))}
            </ul>
        </>
    );
}

export default PlantList;