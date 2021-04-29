import pageNotFoundIcon from '../../assets/page_not_found_black_24dp.svg';
import errorIcon from '../../assets/error_black_24dp.svg';
import lockClosedIcon from '../../assets/lock_black_24dp.svg';
import { Link } from "react-router-dom";
import './StatusCard.css'
import PropTypes from 'prop-types';

/**
 * ## How it works
 * The `StatusCard` component is a simple component that is capable of rendering 
 * an HTTP status code and an error message underneath. All information is provided via props.
 * It displays a link letting the user go back the to home page.
 * 
 * ## Usage
 * 1. Import the StatusCard component from '`src/components/StatusCard/StatusCard`' 
 * 2. To render the component write `<StatusCard />` where you want the card to render on the page.
 */

function StatusCard(props) {
    const { statusCode, statusText } = props;

    let color;
    let icon;

    switch (statusCode.toString()) {
        case "403":
            color = 'orange'
            icon = lockClosedIcon
            break;

        case "404":
            color = 'red'
            icon = pageNotFoundIcon
            break;

        default:
            color = ''
            icon = errorIcon
            break;
    }

    return (
        <div className="container status-card">
            <img src={icon} alt="" />
            <h1><span className={`big-number ${color}`}>{statusCode.toString()}</span> {statusText}</h1>
            <p>Return to the <Link to="/">Home Page</Link></p>
        </div>
    )
}

//#region JSDoc for Storybook & default props

StatusCard.defaultProps = {
    statusCode: 200
}

StatusCard.propTypes = {
    /** Checks if the button should be active (visually only).
     * Currently, only the 'secondary-outlined" receives styles when active is set.
    */
    statusCode: PropTypes.number.isRequired,

    /** Checks if the button should be disabled (HTML disabled attribute). */
    statusText: PropTypes.string.isRequired,
}

//#endregion

export default StatusCard;