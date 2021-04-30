import './IndividualPlantPage.css';
import PlantStatusCard from '../PlantStatusCard/PlantStatusCard'
import Bilde from '../../assets/bilde.jpg'

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
            <div>
                <img className="individual-plant-image" src={Bilde} alt="plant" />
                <PlantStatusCard plant={plant} />
            </div>
        </>
    )
}

export default IndividualPlantPage;