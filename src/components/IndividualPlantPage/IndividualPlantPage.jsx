import './IndividualPlantPage.css';
import PlantStatusCard from '../PlantStatusCard/PlantStatusCard';
import Bilde from '../../assets/plant.jpg';
import Button from '../Button/Button';
import Header from '../Header/Header';
import { isToday, parseISO } from 'date-fns';

function IndividualPlantPage({ plant, isAuth, handleWateringClick, handlefertilizationClick, handlePostponeClick, handleRequestClick }) {
    let plantImage;
    if(!plant.image) {
        plantImage = Bilde;
    } else {
        plantImage = process.env.REACT_APP_IMAGE + plant.image;
    }

    return (
        <>
            <Header heading={plant.name} />
            <div className="individual-plant-grid-container">

                <div className="image-and-description">
                    <img className="image" src={plantImage} alt={plant.name} />
                    <div className="description">
                        <h3>Description</h3>
                        <p>{plant.information.description ? plant.information.description : '–'}</p>

                        {plant.information.placement &&
                            <>
                                <h3>Placement</h3>
                                <p>{plant.information.placement}</p>
                            </>
                        }

                        {plant.information.watering &&
                            <>
                                <h3>Water</h3>
                                <p>{plant.information.watering}</p>
                            </>
                        }

                        {plant.information.nutrition &&
                            <>
                                <h3>Nutrition</h3>
                                <p>{plant.information.nutrition}</p>
                            </>
                        }
                    </div>
                </div>

                <div className="buttons-and-status-card">
                    <div className="status-card">
                        <PlantStatusCard plant={plant} />
                    </div>

                    <div className="buttons-group">
                    <Button label="request care" variant="primary" size="full" disabled={isToday(parseISO(plant.lastRequestedDate))} onClick={() => handleRequestClick(plant._id)}/>

                        {isAuth &&
                            <>
                                <div className="buttons-side-by-side">
                                    <Button label="water this plant" variant="secondary" size="half" onClick={handleWateringClick} />
                                    <Button label="fertilize this plant" variant="tertiary" size="half" onClick={handlefertilizationClick} />
                                </div>

                                <div className="buttons-side-by-side">
                                    <Button label="postpone watering" variant="secondary" size="half" onClick={() => handlePostponeClick('watering')} />
                                    <Button label="postpone fertilizer" variant="tertiary" size="half" onClick={() => handlePostponeClick('fertilization')} />
                                </div>
                            </>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndividualPlantPage;