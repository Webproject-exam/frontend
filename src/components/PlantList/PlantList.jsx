import './PlantList.css';
import PlantListItem from '../PlantListItem/PlantListItem';

let plants = [
    {
        name: "Arekapalme",
        location: "Bygg 118 - 3. etg",
        next_watering: "Today",
        lighting_requirements: "Average",
        fertilizer: "Masse!"
    },
    {
        name: "Monstera",
        location: "Bygg 118 - 2. etg: Rom 206",
        next_watering: "Tomorrow",
        lighting_requirements: "Average",
        fertilizer: "Lite"
    },
    {
        name: "Gullranke ampel",
        location: "Fabrikken (Bygg 115/159) - 3. etg",
        next_watering: "6 days",
        lighting_requirements: "Average",
        fertilizer: "Lite"
    },
    {
        name: "Strelitzia nicolai",
        location: "Fabrikken (Bygg 115/159) - 3. etg",
        next_watering: "6 days",
        lighting_requirements: "Average",
        fertilizer: "Lite"
    }
];

function PlantList() {
    return (
        <ul className="plant-list">
            {plants.map((plants) => (<PlantListItem key={plants.name} plant={plants}/>))}
        </ul>
    );
}

export default PlantList;