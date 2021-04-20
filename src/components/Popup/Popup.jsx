import './Popup.css';
import Button from '../Button/Button'
import PropTypes from 'prop-types';
import UpdateUser from '../UpdateUser/UpdateUser';
import updateUserBackend from '../HOC/UpdateUserHOC';

/** 
 * ## How it works
 * The `Popup` component is a pop-up that either shows the user a form with input 
 * fields for updating a user, or a pop-up that asks for confirmation before deleting
 * a user from the database. The pop-up component is only supposed to be used when on the dashboard page.
 * 
 * When the user decided to delete or edit a user, the `popup` component retrieves a user prop 
 * from `UserListHOC` (`src/components/HOC/UserLIstHOC`) for the user that is being deleted or edited. 
 * It also receives the `popupVariant` prop that decides if the pop-up should display "editing mode" or "deleting mode".
 * 
 * Multiple clickHandler is also sent to the component. these click handlers are activated 
 * when the user send in the form or clicks "confirm delete".
 * 
 * ## Usage
 * We have used the `Popup` component in the `UserListHOC` file.
 * 
 * 1. Import the `Popup` component from `src/component/Popup/Popup/`.
 * 
 * 
 * 2. The `Popup` component is dependent on some props to function properly, 
 *    therefore, provide it with at least the '`popupVariant`', '`onAbortClick`', '`user`' props. 
 * 
 * 
 * 3. It is recommended to render the popup component conditionally. For example, we are rendering it based on the state of the `UserListHOC`
*/

function Popup(props) {
    const { popupVariant, onUpdateForm, user, onAbortClick, onDeleteUser, onResetClick, place} = props

    const UpdateUserHOC = updateUserBackend(UpdateUser);
    return (
        <div className="popup-userlist">
            <div className="popup-content">
                {popupVariant === 'edit' &&
                    <UpdateUserHOC onUpdateForm={onUpdateForm} selectedUser={user} place={place} onAbortClick={onAbortClick} onResetClick={onResetClick} />
                }

                {popupVariant === 'delete' &&
                    <div className="container">
                        <p>Are you sure you want to delete the user <span className="bold">{user.name} {user.surname}</span>?</p>
                        <p className="low-emphasis-text">This action can not be undone!</p>

                        <div className="buttons-side-by-side">
                            <Button onClick={onAbortClick} label="Cancel" size="half" variant="secondary-outlined" />
                            <Button onClick={onDeleteUser} label="Confirm Delete" size="half" variant="danger" />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

Popup.defaultProps = {
    place: 'dashboard'
}

Popup.propTypes = {
    /** The user object should include name, surname, role, and email. 
     * These values should be strings. */
    user: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        role: PropTypes.oneOf(['gardener', 'manager', '']),
        surname: PropTypes.string,
    }).isRequired,

    /** The variant corresponds to the user action. Either deleting a user or updating the information of a user (or their self). */
    popupVariant: PropTypes.oneOf(['edit', 'delete']).isRequired,

    /** onAbortClick is the handler for when the user presses the cancel button.  */
    onAbortClick: PropTypes.func.isRequired,

    /** onDeleteUser is the handler for when the user presses the delete button.  */
    onDeleteUser: PropTypes.func,

    /** onUpdateForm is sent from the UserListHOC. It fetches the users data from the back-end. */
    onUpdateForm: PropTypes.func,

    place: PropTypes.oneOf(['dashboard']).isRequired,
}

export default Popup;