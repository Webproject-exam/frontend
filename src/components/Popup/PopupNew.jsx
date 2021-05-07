import './Popup.css';

function PopupNew(props) {
    const { content } = props

    return (
        <div className="popup-userlist">
            <div className="popup-content">
                {content}
            </div>
        </div>
    );
}

export default PopupNew;