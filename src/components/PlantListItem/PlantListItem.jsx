import './PlantListItem.css';
import Button from '../Button/Button'
import Image from '../../assets/plant.jpg';
import AlertIcon from '../../assets/water_alert_icon.svg';
import WarningIcon from '../../assets/invert_colors_white_24dp.svg';

function PlantListItem({ plant }) {
    let Icon;
    let Color;

    if(plant.next_watering === "Today"){
        Icon = AlertIcon;
        Color = "red";
    } else if (plant.next_watering === "Tomorrow") {
        Icon = WarningIcon;
        Color = "orange"
    } else {
        Icon = false;
        Color = false
    }



    return (<li>
        <div className="plant-container ">
            <div className="plant-header">
                <div className={`status-circle ${Color}`}>
                    {Color && <img src={Icon} alt="" />}
                    </div>
                <h2 className="h2">{plant.name}</h2>
                <h3 className="h3">{plant.location}</h3>
            </div>
            <img className="hero-image" src={Image} alt="plant" />
            <p>Next watering: <b>{plant.next_watering}</b>.</p>
            <p>Lighting requirements: <b>{plant.lighting_requirements}</b>.</p>
            <p>Fertilizer: <b>{plant.fertilizer}</b></p>
            <Button variant="secondary-outlined" label="water this plant" />
        </div>
    </li>)
}

export default PlantListItem;