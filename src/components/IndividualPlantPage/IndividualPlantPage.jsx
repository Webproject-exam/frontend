import './IndividualPlantPage.css';
import PlantStatusCard from '../PlantStatusCard/PlantStatusCard'
import Bilde from '../../assets/bilde.jpg'
import Button from '../Button/Button'

let plant = {
    name: "Arkapalme",
    placement: {
        building: "Fabrikken (Bygg 115/159)",
        floor: "2. etg",
        room: "Rom 206"
    },
    watering: {
        frequency: "every 14 days",
        next: "3 days",
        responsible: "Ola Nordmann",
        last_watered_by: "Kari Nordmann",
        last_watered_date: "5. april 2021",
        last_postponed: "2. april 2021",
        postponed_reason: "still moist"
    },
    fertilization: {
        frequency: "every 60 days",
        next: "27 days"
    },
    ligtning: "Average",
    added: "1. jan 2020"
}

function IndividualPlantPage(props) {

    return (
        <>
            <header className="individual-plant-header">
                <h1>Palmefitte</h1>
            </header>
            <div className="individual-plant-grid-container">
                
                <img className="individual-plant-image" src={Bilde} alt="plant" />
                
                <PlantStatusCard plant={plant} />

                <div className="individual-plant-buttons">
                    <div className="buttons-side-by-side">
                        <Button label="request watering" variant="secondary" size="half"/>
                        <Button label="request fetilizer" variant="secondary" size="half"/>
                    </div>
    
                    <div className="buttons-side-by-side">
                        <Button label="water this plant" variant="secondary" size="half"/>
                        <Button label="fertilize this plant" variant="secondary" size="half"/>
                    </div>
    
                    <div className="buttons-side-by-side">
                        <Button label="postpone watering" variant="secondary" size="half"/>
                        <Button label="postpone fetilizer" variant="secondary" size="half"/>
                    </div>
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