import './PlantStatusCard.css';
import PlantStatusCircle from '../PlantStatusCircle/PlantStatusCircle';
import { myTimeConverter } from '../../helpers/timeConverter'
import { format } from 'date-fns'
import { parseISO } from 'date-fns/esm';

function PlantStatusCard(props) {
    console.log(props.plant);

    return (
        <div className="plant-status-card container">
            <div className="plant-status-card-header">
                <h2 className="h2">Status</h2>
                <PlantStatusCircle next_watering={props.plant.watering.waterNext} />
            </div>
            <ul>
                <li>
                    <span className="bold">Placement:</span> {props.plant.placement.building} – {props.plant.placement.floor} – {props.plant.placement.room}
                </li>
            </ul>
            <section>
                <h3>Watering</h3>
                <li>
                    <span className="bold">Watering frequency:</span> every {props.plant.watering.waterFrequency} days
                </li>

                <li>
                    <span className="bold">Next watering:</span> {myTimeConverter(props.plant.watering.waterNext)}
                </li>

                <li>
                    <span className="bold">To be watered by:</span> {props.plant.watering.responsible}
                </li>

                <li>
                    <span className="bold">Last watered by:</span> {props.plant.watering.last_watered_by}
                </li>

                <li>
                    <span className="bold">Watering was last postponed:</span> {props.plant.watering.last_postponed ? format(parseISO(props.plant.watering.last_postponed), 'PPP') : 'never'}
                </li>

                <li>
                    <span className="bold">Reasoning for the last postponement:</span> "{props.plant.watering.postponed_reason}"
                </li>
            </section>

            <section>
                <h3>fertilization</h3>
                <li>
                    <span className="bold">Fertilized frequency:</span> every {props.plant.fertilization.fertFrequency} days
                </li>

                <li>
                    <span className="bold">Next fertilization: </span> {myTimeConverter(props.plant.fertilization.fertNext)}
                </li>

                <li>
                    <span className="bold">Fertilization was last postponed:</span> {props.plant.fertilization.last_postponed ? format(parseISO(props.plant.fertilization.last_postponed), 'PPP') : 'never'}</li>

                <li>
                    <span className="bold">Reasoning for the last postponement:</span> "{props.plant.watering.postponed_reason}"
                </li>
            </section>

            <section>
                <h3>Other</h3>
                <li>
                    <span className="bold">Recommended lighting: </span> {props.plant.lighting}
                </li>

                <li>
                    <span className="bold">Has been a part of Mustad since:</span> {format(parseISO(props.plant.createdAt), 'PPP')}
                </li>
            </section>

        </div>
    )
}

export default PlantStatusCard;