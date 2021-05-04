import './UserListItem.css';
import Button from '../Button/Button'
import PropTypes from 'prop-types';

/**
 * ## How it works
 * The UserListItem is responsible for displaying a single user that it receives from its props. 
 * It displays the name, surname, email, and role of a user. It also renders two buttons letting 
 * a user edit the information or delete the user. If the user displayed is a gardener the edit 
 * and delete buttons will be disabled.
 * 
 * ## Usage
 * The component is supposed to be inside a map function inside `UserList`
 * 
 * 1. Import `UserListItem` (`src/components/UserListItem/UserListItem`) in the `UserList` (`src/components/UserList/UserList`) file. 
 * 
 * 2. Write `<UserListItem />` inside the map function in the `UserList` file.
 * 
 * 3. Provide the `<UserListItem />` with the appropriate props such as `user` and event handlers.
 */

function UserListItem({ user, handleDeleteClick, handleEditClick }) {
    /* return (<li>
        <div className="container userlist">
            <h2>{user.name} {user.surname}</h2>
            <h3>Role: {user.role}</h3>
            <p><b>Email:</b> {user.email}</p>
            <div className="user-list-item-buttons">
                {user.role === "gardener" ? <Button onClick={() => handleEditClick(user)} variant="secondary" label="edit" size="half" /> : <Button variant="secondary" label="edit" disabled={true} size="half" />}
                {user.role === "gardener" ? <Button onClick={() => handleDeleteClick(user)} variant="danger" label="delete" size="half" /> : <Button variant="danger" label="delete" disabled={true} size="half" />}
            </div>
        </div>
    </li>) */

    return (
        <>
            <tr>
                <td>{user.name} {user.surname}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td><Button onClick={() => handleEditClick(user)} variant="secondary" label="edit" size="half" /></td>
                <td><Button onClick={() => handleDeleteClick(user)} variant="danger" label="delete" size="half" /></td>


            </tr>
        </>
    )
}

//#region JSDoc for Storybook & default props

UserListItem.defaultProps = {
    user: {
        role: 'gardener'
    }
}

UserListItem.propTypes = {
    /** The user object should include name, surname, role, and email. 
     * These values should be strings.  */
    user: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        role: PropTypes.oneOf(['gardener', 'manager']),
        surname: PropTypes.string,
    }).isRequired,

    /** handleEditClick is the handler for when the user presses the edit button.  */
    handleEditClick: PropTypes.func,

    /** handleDeleteClick is the handler for when the user presses the delete button.  */
    handleDeleteClick: PropTypes.func
}

//#endregion 

export default UserListItem;