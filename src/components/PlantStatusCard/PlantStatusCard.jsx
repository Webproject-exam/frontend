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
            <section>
                <h3>Placement</h3>
                <ul>
                    <li>
                        <span className="bold">Building:</span> {props.plant.placement.building}
                    </li>
                    <li>
                        <span className="bold">Floor:</span> {props.plant.placement.floor}
                    </li>
                    <li>
                        <span className="bold">Room:</span> {props.plant.placement.room}
                    </li>
                </ul>
            </section>
            <section>
                <h3>Watering</h3>
                <ul>
                    <li>
                        <span className="bold">Watering frequency:</span> every {props.plant.watering.waterFrequency} days
                    </li>

                    <li>
                        <span className="bold">Next watering:</span> {myTimeConverter(props.plant.watering.waterNext)}
                    </li>

                    {props.plant.watering.waterAmount &&
                        <li>
                            <span className="bold">Watering amount:</span> {props.plant.watering.waterAmount}
                        </li>}

                    {props.plant.watering.lastWateredBy &&
                        <li>
                            <span className="bold">Last watered by:</span> {props.plant.watering.lastWateredBy}
                        </li>}

                    {props.plant.watering.lastPostponed &&
                        <li>
                            <span className="bold">Watering was last postponed:</span> {format(parseISO(props.plant.watering.last_postponed), 'PPP')}
                        </li>}
                    {props.plant.watering.lastPostponedReason &&
                        <li>
                            <span className="bold">Reasoning for the last postponement:</span> "{props.plant.watering.lastPostponedReason}"
                        </li>}
                </ul>
            </section>

            <section>
                <h3>Fertilization</h3>
                <ul>
                    <li>
                        <span className="bold">Fertilized frequency:</span> every {props.plant.fertilization.fertFrequency} days
                    </li>

                    <li>
                        <span className="bold">Next fertilization: </span> {myTimeConverter(props.plant.fertilization.fertNext)}
                    </li>

                    {props.plant.fertilization.lastPostponed &&
                        <li>
                            <span className="bold">Fertilization was last postponed:</span> {format(parseISO(props.plant.fertilization.lastPostponed), 'PPP')}
                        </li>}

                    {props.plant.fertilization.lastPostponedReason &&
                        <li>
                            <span className="bold">Reasoning for the last postponement:</span> "{props.plant.fertilization.lastPostponedReason}"
                        </li>}
                </ul>
            </section>

            <section>
                <h3>Other</h3>
                <ul>
                    {props.plant.responsible &&
                        <li>
                            <span className="bold">Responsible:</span> {props.plant.watering.responsible}
                        </li>}
                    <li>
                        <span className="bold">Recommended lighting: </span> {props.plant.lighting}
                    </li>

                    <li>
                        <span className="bold">Has been a part of Mustad since:</span> {format(parseISO(props.plant.createdAt), 'PPP')}
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default PlantStatusCard;