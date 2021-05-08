import './PlantStatusCircle.css';
import AlertIcon from '../../assets/water_alert_icon.svg';
import WarningIcon from '../../assets/invert_colors_white_24dp.svg';
import { myTimeConverter } from '../../helpers/timeConverter'
import { isPast } from 'date-fns'


function PlantStatusCircle({ waterNext }) {
    let Icon;
    let Color;
    let Pulse;

    if (myTimeConverter(waterNext) === 'today') {
        Icon = AlertIcon;
        Color = 'red';
        Pulse = '';

    } else if (isPast(new Date(waterNext))) {
        Icon = AlertIcon;
        Color = 'red';
        Pulse = 'pulse';

    } else if (myTimeConverter(waterNext) === 'tomorrow' || myTimeConverter(waterNext) === 'the day after tomorrow') {
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