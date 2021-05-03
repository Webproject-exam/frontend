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
                <div className="section">
                    <li>
                        <span className="bold">Placement:</span> {props.plant.placement.building} – {props.plant.placement.floor} – {props.plant.placement.room}
                    </li>
                </div>

                <section>
                    <h3>watering</h3>
                    <ul>
                        <li>
                            <span className="bold">Watering frequency:</span> every {formatDistanceStrict(props.plant.watering.frequency, 0, { unit: 'day' })}
                        </li>
    
                        <li>
                            <span className="bold">Next watering:</span> {myTimeConverter(props.plant.watering.next)}
                        </li>
    
                        <li>
                            <span className="bold">To be watered by:</span> {props.plant.watering.responsible}
                        </li>
    
                        <li>
                            <span className="bold">Last watered by:</span> {props.plant.watering.last_watered_by}
                        </li>
    
                        <li>
                            <span className="bold">Watering was last postponed:</span> {format(props.plant.watering.last_postponed, 'PPP')}</li>
                        <li>
                            <span className="bold">Reasoning for the last postponement:</span> "{props.plant.watering.postponed_reason}"
                        </li>
                    </ul>
                </section>

                <section>
                    <h3>fertilization</h3>
                    <ul>
                        <li>
                            <span className="bold">Fertilized frequency:</span> every {formatDistanceStrict(props.plant.fertilization.frequency, 0, { unit: 'day' })}
                        </li>
    
                        <li>
                            <span className="bold">Next fertilization: </span> {myTimeConverter(props.plant.fertilization.next)}
                        </li>
    
                        <li>
                            <span className="bold">Fertilization was last postponed:</span> {format(props.plant.watering.last_postponed, 'PPP')}</li>
                        <li>
                            <span className="bold">Reasoning for the last postponement:</span> "{props.plant.watering.postponed_reason}"
                        </li>
                    </ul>
                </section>

                <section>
                    <h3>other</h3>
                    <ul>
                        <li>
                            <span className="bold">Recommended lighting: </span> {props.plant.lighting}
                        </li>
    
    
                        <li>
                            <span className="bold">Has been a part of Mustad since:</span> {format(props.plant.createdAt, 'PPP')}
                        </li>
                    </ul>
                </section>
        </div>
    )
}

export default PlantStatusCard;