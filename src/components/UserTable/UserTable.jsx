import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import Button from '../Button/Button'

function UserList({ users, handleDeleteClick, handleEditClick }) {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Role</Th>
                    <Th>Email</Th>
                    <Th>Operations</Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((user) => (
                    <Tr key={user.email}>
                        <Td>{user.name} {user.surname}</Td>
                        <Td><span>{user.role}</span></Td>
                        <Td>{user.email}</Td>
                        <Td>
                            <div className="buttons-side-by-side">
                                {user.role === "gardener" ? <Button onClick={() => handleEditClick(user)} variant="secondary" label="🖊️" size="half" aria-label="Edit"/> : <Button variant="secondary" label="🖊️" disabled={true} size="half" aria-label="Edit"/>}
                                {user.role === "gardener" ? <Button onClick={() => handleDeleteClick(user)} variant="danger" label="🗑️" size="half" aria-label="Delete"/> : <Button variant="danger" label="🗑️" disabled={true} size="half" aria-label="Delete"/>}
                            </div>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

export default UserList;