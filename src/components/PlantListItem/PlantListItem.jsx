import './PlantListItem.css';
import Button from '../Button/Button'
import Image from '../../assets/plant.jpg';
import PlantStatusCircle from '../PlantStatusCircle/PlantStatusCircle';

function PlantListItem({ plant }) {
    return (<li>
        <div className="plant-container">
            <div className="plant-header">
                <PlantStatusCircle next_watering={plant.next_watering}/>
                <h2 className="h2">{plant.name}</h2>
                <h3 className="h3">{plant.location}</h3>
            </div>
            <img className="hero-image" src={Image} alt="plant" />
            <p>Next watering: <b>{plant.next_watering}</b>.</p>
            <p>Lighting requirements: <b>{plant.lighting_requirements}</b>.</p>
            <p>Fertilizer: <b>{plant.fertilizer}</b></p>
            <Button variant="text-only" label="water this plant" size="auto" />
        </div>
    </li>)
}

export default PlantListItem;