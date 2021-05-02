import './PlantStatusCard.css';
import PlantStatusCircle from '../PlantStatusCircle/PlantStatusCircle';
import { myTimeConverter } from '../../helpers/timeConverter'
import { formatDistanceStrict, format } from 'date-fns'

function PlantStatusCard(props) {

    return (
        <div className="plant-status-card container">
            <div className="plant-status-card-header">
                <h2 className="h2">Status</h2>
                <PlantStatusCircle next_watering={props.plant.watering.next} />
            </div>

            <ul>
                {props.plant.placement &&
                    <li>
                        <span className="bold">Placement:</span> {props.plant.placement.building} – {props.plant.placement.floor} – {props.plant.placement.room}
                    </li>}
                {props.plant.watering.frequency &&
                    <li>
                        <span className="bold">Watering frequency:</span> every {formatDistanceStrict(props.plant.watering.frequency, 0, {unit: 'day'})}
                    </li>}
                {props.plant.watering.next &&
                    <li>
                        <span className="bold">Next watering:</span> {myTimeConverter(props.plant.watering.next)}
                    </li>}
                {props.plant.fertilization &&
                    <li>
                        <span className="bold">Fertilized frequency:</span> every {formatDistanceStrict(props.plant.fertilization.frequency, 0 , {unit: 'day'})}
                    </li>}
                {props.plant.fertilization &&
                    <li>
                        <span className="bold">Next fertilization: </span> {myTimeConverter(props.plant.fertilization.next)}
                    </li>}
                {props.plant.lighting &&
                    <li>
                        <span className="bold">Recommended lighting: </span> {props.plant.lighting}
                    </li>}
                {props.plant.watering &&
                    <li>
                        <span className="bold">To be watered by:</span> {props.plant.watering.responsible}
                    </li>}
                {props.plant.watering &&
                    <li>
                        <span className="bold">Last watered by:</span> {props.plant.watering.last_watered_by}
                    </li>}
                {props.plant.placement &&
                    <li>
                        <span className="bold">Has been a part of Mustad since:</span> {format(props.plant.added, 'PPP')}
                    </li>}
                {props.plant.placement &&
                    <li>
                        <span className="bold">Watering was last postponed:</span> {format(props.plant.watering.last_postponed, 'PPP')}</li>
                }
                {props.plant.placement &&
                    <li>
                        <span className="bold">Reasoning for the last postponement:</span> "{props.plant.watering.postponed_reason}"
                    </li>}
            </ul>
        </div>
    )
}

export default PlantStatusCard;