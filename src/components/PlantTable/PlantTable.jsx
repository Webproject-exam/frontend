import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import Button from '../Button/Button'

function PlantList({ plants, handleDeleteClick, handleEditClick }) {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Location</Th>
                    <Th>Water Frequency</Th>
                    <Th>Fertilization Frequency</Th>
                    <Th>Operations</Th>
                </Tr>
            </Thead>
            <Tbody>
                {plants.map((plant) => (
                    <Tr key={plant._id}>
                        <Td>{plant.name}</Td>
                        <Td><span>{plant.placement.building} - #{plant.placement.floor} - {plant.placement.room}</span></Td>
                        <Td>Every {plant.watering.waterFrequency} days</Td>
                        <Td>Every {plant.fertilization.fertFrequency} days</Td>
                        <Td>
                            <div className="buttons-side-by-side">
                                <Button onClick={() => handleEditClick(plant)} variant="secondary" label="🖊️" size="half" aria-label="Edit"/>
                                <Button onClick={() => handleDeleteClick(plant)} variant="danger" label="🗑️" size="half" aria-label="Delete"/>
                            </div>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

export default PlantList;