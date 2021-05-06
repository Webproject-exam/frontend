import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import Button from '../Button/Button'

/**
 * ## How it works
 * The PlantList component is responsible for receiving all the users from the back-end via props. 
 * (These users are provided by `PlantListHOC` (`src/components/HOC/PlantListHOC`)).
 * It then generates a list of `<PlantListItems />` components for each user from the back-end. 
 * It also passes on some event handlers to each` <PlantListItems />` component.
 * 
 * ## Usage
 * To use the PlantList component.
 * 
 * 1. Import the `PlantListHOC` file from 'src/components/HOC/PlantListHoc' 
 *
 * 2. Import the `PlantList` component from 'src/components/PlantList/PlantList' 
 * 
 * 3. Create a constant that is equal to `PlantList` wrapped by `PlantListHOC`, 
 *    for example: `const PlantListWithHOC = withUsersFetch(PlantList);` Because the 
 *    constant declared above is equal to a component, we can use it inside the return 
 *    statement of a render method. The result is a component that creates a `PlantListItem` 
 *    for each user it gets from the HOC file
 */

function PlantList({ plants, handleDeleteClick, handleEditClick }) {
    console.log(plants);
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
                        <Td><span>{plant.placement.building} #{plant.placement.floor} {plant.placement.room}</span></Td>
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