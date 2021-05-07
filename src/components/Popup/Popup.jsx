import { useEffect } from 'react';
import './Popup.css';

function Popup(props) {
    const { content } = props;

    useEffect(() => {
        let scrollPosition = window.pageYOffset;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
        return () => {
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('position');
            document.body.style.removeProperty('top');
            document.body.style.removeProperty('width');
            window.scrollTo(0, scrollPosition);
        }
    }, []);

    return (
        <div className="popup-userlist">
            <div className="popup-content">
                {content}
            </div>
        </div>
    );
}

export default Popup;