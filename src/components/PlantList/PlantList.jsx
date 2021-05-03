import './PlantList.css';
import PlantListItem from '../PlantListItem/PlantListItem';
import Header from '../Header/Header'

function PlantList(props) {
    const { plants } = props;
    return (
        <>
            <Header heading="Overview"/>
            <ul className="plant-list">
                {plants.map((plants) => (<PlantListItem key={plants.name} plant={plants}/>))}
            </ul>
        </>
    );
}

export default PlantList;