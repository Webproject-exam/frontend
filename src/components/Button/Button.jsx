import './Button.css';
import PropTypes from 'prop-types';

/**
 * ## How it works
 * The button component is independent. 
 * It returns an `<button>` HTML tag with different attributes provided via props when calling the component. 
 * Classes are applied via props to generate different visual styles.
 * 
 * ## Usage
 *  1. The Button component can be used by first importing it from `src/components/Button/Button`.
 *  2. Write `<Button />` where you want the button to appear on the page when rendered.
 *  3. Provide the `<Button />` component with relevant props. Such a 'label' and 'variant'. (See `Button.propTypes` for more details)
 */

function Button(props) {
    const { variant, type, onClick, disabled, label, size, active } = props;

    return (
        <button
            className={`button ${variant} ${size}-size ${active === true ? 'active' : ''}`}
            disabled={disabled}
            type={type}
            onClick={onClick}>
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
    variant: PropTypes.oneOf(['primary', 'secondary', 'secondary-outlined', 'danger', 'danger-outlined', 'text-only']).isRequired,
}

export default Button;