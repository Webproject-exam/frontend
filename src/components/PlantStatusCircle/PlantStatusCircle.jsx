import './PlantStatusCircle.css';
import AlertIcon from '../../assets/water_alert_icon.svg';
import WarningIcon from '../../assets/invert_colors_white_24dp.svg';
import { myTimeConverter } from '../../helpers/timeConverter'
import { isPast } from 'date-fns'

function PlantStatusCircle({ waterNext }) {
    let Icon;
    let Color;
    let Pulse;
    let alt;

    if (myTimeConverter(waterNext) === 'today') {
        Icon = AlertIcon;
        Color = 'red';
        Pulse = '';

    } else if (isPast(new Date(waterNext))) {
        Icon = AlertIcon;
        Color = 'red';
        Pulse = 'pulse';
        alt = 'droplet with explanation mark'

    } else if (myTimeConverter(waterNext) === 'tomorrow' || myTimeConverter(waterNext) === 'in 2 days') {
        Icon = WarningIcon;
        Color = 'orange';
        Pulse = '';
        alt = 'half filled droplet';

    } else {
        Color = '';
        Icon = '';
        Pulse = '';
        alt = '';
    }

    return (
        <div className={`status-circle ${Color} ${Pulse}`}>
            {Color && <img src={Icon} alt={alt} />}
        </div>
    )
}

export default PlantStatusCircle;