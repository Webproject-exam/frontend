import './PlantStatusCircle.css';
import AlertIcon from '../../assets/water_alert_icon.svg';
import WarningIcon from '../../assets/invert_colors_white_24dp.svg';


function PlantStatusCircle({ next_watering }) {

    let Icon;
    let Color;

    if (next_watering === "Today") {
        Icon = AlertIcon;
        Color = "red";
    } else if (next_watering === "Tomorrow") {
        Icon = WarningIcon;
        Color = "orange"
    } else {
        Icon = false;
        Color = false
    }

    return (
        <div className={`status-circle ${Color}`}>
            {Color && <img src={Icon} alt="" />}
        </div>
    )
}

export default PlantStatusCircle;