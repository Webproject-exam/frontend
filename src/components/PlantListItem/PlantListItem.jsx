import './PlantListItem.css';
import Button from '../Button/Button'
import Image from '../../assets/plant.jpg';
import Icon from '../../assets/water_alert_icon.svg';

function PlantListItem({ plant, handleWaterClick }) {
    return (<li>
        <div className="plant-container ">
            <div className="plant-header">
                <div className="status-circle"><img src={Icon} alt="" /></div>
                <h2 className="h2">{plant.name}</h2>
                <h3 className="h3">{plant.location}</h3>
            </div>
            <img className="hero-image" src={Image} alt="plant" />
            <p>Next watering: <b>Today</b>.</p>
            <p>Lighting requirements: <b>Half shade</b>.</p>
            <p>Fertilizer: <b>Average</b></p>
            <Button onClick={() => handleWaterClick(plant)} variant="secondary-outlined" label="water this plant" />
        </div>
    </li>)
}

PlantListItem.defaultProps = {
    plant: {
        name: 'Detteeretveldiglangtnavn',
        location: 'Fabrikken (Bygg 115/159) - 3. etg ved heis',
        nextWatering: '21. apr. 2021',
        lightning: 'half shade',
        fertiliizer: 'average'
    }
}

export default PlantListItem;