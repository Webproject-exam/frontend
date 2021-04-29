import './UserList.css';
import PropTypes from 'prop-types';
import UserListItem from '../UserListItem/UserListItem';

/**
 * ## How it works
 * The UserList component is responsible for receiving all the users from the back-end via props. 
 * (These users are provided by `UserListHOC` (`src/components/HOC/UserListHOC`)).
 * It then generates a list of `<UserListItems />` components for each user from the back-end. 
 * It also passes on some event handlers to each` <UserListItems />` component.
 * 
 * ## Usage
 * To use the UserList component.
 * 
 * 1. Import the `UserListHOC` file from 'src/components/HOC/UserListHoc' 
 *
 * 2. Import the `UserList` component from 'src/components/UserList/UserList' 
 * 
 * 3. Create a constant that is equal to `UserList` wrapped by `UserListHOC`, 
 *    for example: `const UserListWithHOC = withUsersFetch(UserList);` Because the 
 *    constant declared above is equal to a component, we can use it inside the return 
 *    statement of a render method. The result is a component that creates a `UserListItem` 
 *    for each user it gets from the HOC file
 */

function UserList({ users, handleDeleteClick, handleEditClick }) {
    return (
        <ul className="user-list">
            {users.map((users) => (<UserListItem handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} key={users.email} user={users} />))}
        </ul>
    );
}

UserList.propTypes = {
    /** The user object should include name, surname, role, and email. 
     * These values should be strings. */
    users: PropTypes.array.isRequired,

    /** handleDeleteClick is an eventHandler that is connected to the delete button on a UserItemCard component */
    handleDeleteClick: PropTypes.func.isRequired,

    /** handleEditClick is an eventHandler that is connected to the edit button on the UserListItem component */
    handleEditClick: PropTypes.func.isRequired,
}

export default UserList;