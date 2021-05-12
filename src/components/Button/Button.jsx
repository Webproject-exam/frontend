import './Button.css';
import PropTypes from 'prop-types';

function Button(props) {
    const { variant, type, onClick, disabled, label, size, active, ariaLabel } = props;

    return (
        <button
            className={`button ${variant} ${size}-size ${active === true ? 'active' : ''}`}
            disabled={disabled}
            type={type}
            onClick={onClick}
            aria-label={ariaLabel}>
            {label.trim()}
        </button>
    )
}

Button.defaultProps = {
    active: false,
    disabled: false,
    size: 'full',
    type: 'button',
    label: 'default button',
    variant: 'primary'
}

Button.propTypes = {
    /** Checks if the button should be active (visually only).
     * Currently, only the 'secondary-outlined" receives styles when active is set.
    */
    active: PropTypes.bool,

    /** Checks if the button should be disabled (HTML disabled attribute). */
    disabled: PropTypes.bool,

    /** The text to display on the button. */
    label: PropTypes.string.isRequired,

    /** aria label */
    ariaLabel: PropTypes.string,

    /** The OnClick eventHandler. */
    onClick: PropTypes.func,

    /** The width of the button.
     * 
     * 'full' takes 100% of the parent's container's width. 
     * 
     * 'half' takes 49% of the parent's container's width (Great for button side-by-side).
     * 
     * 'auto' removes the width from the CSS
    */
    size: PropTypes.oneOf(['full', 'half', 'auto']),

    /** The type of the button (HTML type attribute). */
    type: PropTypes.oneOf(['button', 'submit', 'reset']),

    /** The variant of the button changes the color. */
    variant: PropTypes.oneOf(['primary', 'secondary', 'secondary-outlined', 'danger', 'danger-outlined', 'text-only', 'tertiary', 'text-only-tab', 'fab']).isRequired,
}

export default Button;