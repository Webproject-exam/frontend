import './Button.css';

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

export default Button;