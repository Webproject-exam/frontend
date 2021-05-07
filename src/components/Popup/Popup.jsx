import './Popup.css';

function Popup(props) {
    const { content } = props

    return (
        <div className="popup-userlist">
            <div className="popup-content">
                {content}
            </div>
        </div>
    );
}

export default Popup;