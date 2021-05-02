import './PlantStatusCircle.css';
import AlertIcon from '../../assets/water_alert_icon.svg';
import WarningIcon from '../../assets/invert_colors_white_24dp.svg';
import { myTimeConverter } from '../../helpers/timeConverter'
import { isPast } from 'date-fns'


function PlantStatusCircle({ next_watering }) {

    let Icon;
    let Color;
    let Pulse;

    if (myTimeConverter(next_watering) === 'today') {
        Icon = AlertIcon;
        Color = 'red';
        Pulse = '';

    } else if (isPast(next_watering)) {
        Icon = AlertIcon;
        Color = 'red';
        Pulse = 'pulse';

    } else if (myTimeConverter(next_watering) === 'tomorrow' || myTimeConverter(next_watering) === 'the day after tomorrow') {
        Icon = WarningIcon;
        Color = 'orange';
        Pulse = '';

    } else {
        Color = '';
        Icon = '';
        Pulse = '';
    }

    return (
        <div className={`status-circle ${Color} ${Pulse}`}>
            {Color && <img src={Icon} alt='' />}
        </div>
    )
}

export default PlantStatusCircle;