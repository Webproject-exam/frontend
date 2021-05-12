import './PlantListItem.css';
import Button from '../Button/Button'
import Image from '../../assets/plant.jpg';
import PlantStatusCircle from '../PlantStatusCircle/PlantStatusCircle';
import { Link } from "react-router-dom";
import { myTimeConverter } from '../../helpers/timeConverter'

function PlantListItem({ plant, auth, handleWateringClick }) {
    const location = `${plant.placement.building} – #${plant.placement.floor} – ${plant.placement.room}`;
    let plantImage;
    if (!plant.image) {
        plantImage = Image;
    } else {
        plantImage = process.env.REACT_APP_IMAGE + plant.image;
    }

    return (
        <li>
            <div className="plant-container">
                <Link to={'/plants/' + plant._id}>
                    <div className="clickable">
                        <div className="plant-header">
                            <PlantStatusCircle waterNext={plant.watering.waterNext} />
                            <h2 className="h2">{plant.name}</h2>
                            <h3 className="h3">{location}</h3>
                        </div>

                        <img className="plant-image" src={plantImage} alt={plant.name} loading="lazy"/>
                    </div>
                </Link>

                <p>Next watering: <span className="bold">{myTimeConverter(plant.watering.waterNext)}</span>.</p>
                <p>Lighting: <span className="bold">{plant.lighting}</span>.</p>
                <p>Fertilizer: <span className="bold">{plant.fertilization.fertAmount}</span></p>

                {auth && (<Button className="on-top" variant="text-only" label="water this plant" size="auto" onClick={() => handleWateringClick(plant)} />)}
            </div>

        </li>
    )
}

export default PlantListItem;