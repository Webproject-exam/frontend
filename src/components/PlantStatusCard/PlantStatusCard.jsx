import './PlantStatusCard.css';
import PlantStatusCircle from '../PlantStatusCircle/PlantStatusCircle';

function PlantStatusCard(props) {

    return (
        <div className="plant-status-card container">
            <div className="plant-status-card-header">
                <h2 className="h2">Status</h2>
                <PlantStatusCircle next_watering="Today" />
            </div>
            
            <ul>
                {props.plant.placement && <li><span className="bold">Placement:</span> {props.plant.placement.building} – {props.plant.placement.floor} – {props.plant.placement.room}</li>}
                {props.plant.watering.frequency && <li><span className="bold">Watering frequency:</span> {props.plant.watering.frequency}</li>}
                {props.plant.watering.next && <li><span className="bold">Next watering:</span> {props.plant.watering.next}</li>}
                {props.plant.fertilization && <li><span className="bold">Fertilized frequency: </span>{props.plant.fertilization.frequency}</li>}
                {props.plant.fertilization && <li><span className="bold">Next fertilization: </span> {props.plant.fertilization.next}</li>}
                {props.plant.lighting && <li><span className="bold">Recommended lighting: </span> {props.plant.lighting}</li>}
                {props.plant.watering && <li><span className="bold">To be watered by:</span> {props.plant.watering.responsible}</li>}
                {props.plant.watering && <li><span className="bold">Last watered by:</span> {props.plant.watering.last_watered_by}</li>}
                {props.plant.placement && <li><span className="bold">Has been a part of Mustad since:</span> {props.plant.added}</li>}
                {props.plant.placement && <li><span className="bold">Watering was last postponed:</span> {props.plant.watering.last_postponed}</li>}
                {props.plant.placement && <li><span className="bold">Reasoning for the last postponement:</span> "{props.plant.watering.postponed_reason}"</li>}
            </ul>
        </div>
    )
}

export default PlantStatusCard;