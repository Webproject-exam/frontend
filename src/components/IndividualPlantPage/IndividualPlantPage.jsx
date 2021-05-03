import './IndividualPlantPage.css';
import PlantStatusCard from '../PlantStatusCard/PlantStatusCard';
import Bilde from '../../assets/plant.jpg';
import Button from '../Button/Button';
import Header from '../Header/Header';

function IndividualPlantPage(props) {
    const { plant, isAuth } = props;

    return (
        <>
            <Header heading={plant.name}/>
            <div className="individual-plant-grid-container">
                
                {/* finn ut av bildet */}
                <div className="individual-plant-image-and-description">
                    <img classname="image" src={Bilde} alt={plant.name} />
                    <div className="description">
                        <h3>Description</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis ultrices posuere. Pellentesque vehicula felis eu risus porta porttitor. Aenean nec consequat dolor. Ut maximus, sapien id porttitor vestibulum, massa. </p>
                        <h3>Placement</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis ultrices posuere. Pellentesque vehicula felis eu risus porta porttitor. Aenean nec consequat dolor. Ut maximus, sapien id porttitor vestibulum, massa. </p>
                        <h3>Water</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis ultrices posuere. Pellentesque vehicula felis eu risus porta porttitor. Aenean nec consequat dolor. Ut maximus, sapien id porttitor vestibulum, massa. </p>
                        <h3>Nutrition</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mollis ultrices posuere. Pellentesque vehicula felis eu risus porta porttitor. Aenean nec consequat dolor. Ut maximus, sapien id porttitor vestibulum, massa. </p>
                    </div>
                </div>
                
                <div className="individual-plant-buttons-and-status-card">
                    <PlantStatusCard plant={plant} />
    
                    <div className="individual-plant-buttons">
                        <div className="buttons-side-by-side">
                            <Button label="request watering" variant="secondary" size="half"/>
                            <Button label="request fetilizer" variant="tertiary" size="half"/>
                        </div>
        
                        {isAuth &&
                        <>
                            <div className="buttons-side-by-side">
                                <Button label="water this plant" variant="secondary" size="half"/>
                                <Button label="fertilize this plant" variant="tertiary" size="half"/>
                            </div> 
            
                            <div className="buttons-side-by-side">
                                <Button label="postpone watering" variant="secondary" size="half"/>
                                <Button label="postpone fetilizer" variant="tertiary" size="half"/>
                            </div>
                        </>}
                    </div>
                </div>

                <div className="individual-plant-description">
                    <h3>Description</h3>
                    <p>{plant.information.description}</p>
                    <h3>Placement</h3>
                    <p>{plant.information.placement}</p>
                    <h3>Water</h3>
                    <p>{plant.information.watering}</p>
                    <h3>Nutrition</h3>
                    <p>{plant.information.nutrition}</p>
                </div>

            </div>
        </>
    )
}

export default IndividualPlantPage;