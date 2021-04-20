import './my-profile.css';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import accountCircle from '../../assets/person_black_24dp.svg';


/**
 * ## How it works
 * The `MyProfile` component displays the information of the user currently logged in. 
 * It gets the information about the user from its HOC (`src/HOC/MyProfileHOC`) 
 * The component also allows the user to change the user's information by pressing 
 * the Edit button. The edit button is linked to a `handleEditClick` that is also 
 * stored in the HOC file (the `toggleWillEdit` method). When the button is 
 * pressed a `<UpdateUser />` component will be rendered under the `MyProfile` component 
 * where the user can both see and change their information. When the form is filled 
 * out and submitted the data is sent to the back-end and the new information fetched and displayed.
 * 
 * ## Usage
 * 1. To use the `MyProfile` component import the `MyProfileHOC`from `src/components/HOC/MyProfileHOC`
 * 2. Then, import the `MyProfile` component from `src/component/MyProfile/MyProfile`
 * 3. In the file where you want to use the `MyProfile`component, create a constant that is equal 
 *    to `withUserBackEnd(MyProfile)` (The HOC wrapping the `MyProfile` component). 
 *    The constant is now equal to a component.
 * 4. Because the content is a component, we can render it in the `render()` method.
 */
function MyProfile({ selectedUser, handleEditClick }) {
    return (
        <div className="container">
            <img src={accountCircle} alt="Account Circle icon" />
            <h2>{selectedUser.name} {selectedUser.surname}</h2>
            <h3>Role: {selectedUser.role}</h3>
            <p><b>Email:</b> {selectedUser.email}</p>
            <Button onClick={handleEditClick} label="edit profile" variant="secondary" />
        </div>
    );
}

MyProfile.defaultProps = {
    selectedUser: {
        email: 'N/A',
        name: 'N/A, ',
        role: 'gardener',
        surname: 'N/A',
    }
}

MyProfile.propTypes = {
    /** The selectedUser object should include name, surname, role, and email. 
     * These values should be strings.  */
    selectedUser: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        role: PropTypes.oneOf(['gardener', 'manager', 'N/A']),
        surname: PropTypes.string,
    }),
    
    /** handleEditClick is the handler for when the user presses the edit button.  */
    handleEditClick: PropTypes.func.isRequired
}

export default MyProfile;