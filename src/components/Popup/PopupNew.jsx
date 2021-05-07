import './Popup.css';

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

function PopupNew(props) {
    const { content} = props

    return (
        <div className="popup-userlist">
            <div className="popup-content">
                {content}
            </div>
        </div>
    );
}

export default PopupNew;