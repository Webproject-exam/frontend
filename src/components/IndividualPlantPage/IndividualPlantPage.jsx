import './IndividualPlantPage.css';
import PlantStatusCard from '../PlantStatusCard/PlantStatusCard'
import Bilde from '../../assets/plant.jpg'
import Button from '../Button/Button'

function IndividualPlantPage(props) {
    const { plant, isAuth } = props;
    console.log(plant);
    console.log(plant.id)

    return (
        <>
            {/* <header className="individual-plant-header">
                <h1>{plant.name}</h1>
            </header> */}
            <div className="individual-plant-grid-container">
                
                {/* finn ut av bildet */}
                <img className="individual-plant-image" src={Bilde} alt={plant.name} />
                
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

                <div className="individual-plant-description">
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
        </>
    )
}

export default IndividualPlantPage;