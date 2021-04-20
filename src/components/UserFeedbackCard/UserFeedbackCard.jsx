import './UserFeedbackCard.css';
import PropTypes from 'prop-types';

/**
 * ## How it works
 * The user `UserFeedbackCard` component is a simple component that displays an error message or a success 
 * message informing the user about which state the application is in. It can display an error message 
 * on a red background, or a success message on a blue background. The values displayed are provided by props.
 * 
 * ## Usage
 * To use the `UserFeedbackCard` component on a page:
 * 
 * 1. Import the `UserFeedbackCard` component from '`src/components/UserFeedbackCard/UserFeedbackCard`'
 * 
 * 2. Write `<UserfeedbackCard />` where you want to render some feedback. 
 * 
 * 3. Provide appropriate to the component such as variant and text.
 */

function UserFeedbackCard(props) {
    const { variant, onClick, feedbackText } = props;

    return (
        <p
            className={`user-feedback ${variant}`}
            onClick={onClick}>
            <strong>{variant}:</strong> {feedbackText}
        </p>
    )
}

UserFeedbackCard.defaultProps = {
    feedbackText: 'This is your feedback text'
}

UserFeedbackCard.propTypes = {
    /** The variant describes if the feedback is for an error or if it confirms a successful event. */
    variant: PropTypes.oneOf(['error', 'success']).isRequired,

    /** The text to display on the feedback card */
    feedbackText: PropTypes.string.isRequired,

    /** The OnClick eventHandler */
    onClick: PropTypes.func
}

export default UserFeedbackCard;