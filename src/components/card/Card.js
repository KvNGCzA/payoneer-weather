import './Card.scss';
import thunderstorm from '../../assets/icons/thunderstorm_day.png';
import clear from '../../assets/icons/clear_day.png';
import rain from '../../assets/icons/rain_day.png';
import drizzle from '../../assets/icons/drizzle_day.png';
import snow from '../../assets/icons/snow_day.png';
import atmosphere from '../../assets/icons/atmosphere_day.png';
import clouds from '../../assets/icons/clouds_day.png';

const icons = {
  thunderstorm,
  clear,
  rain,
  drizzle,
  snow,
  atmosphere,
  clouds,
};

const Card = ({
  region,
  date,
  temp,
  pressure,
  humidity,
  overcast,
  unit,
  overallCast,
  handleCardClick,
  isActive,
}) => (
  <div
    data-testid='parent-container'
    className={`card${isActive ? ' active' : ''}`}
    onClick={handleCardClick}
  >
    <div className='outline'></div>
    <div className='details'>
      <p className='region' data-testid='region'>
        {region}
      </p>
      <p className='date' data-testid='date'>
        {date}
      </p>
      <p className='temp' data-testid='temp'>
        {unit === 'metric' ? Math.round((temp - 32) * 5/9) : temp}
        <sup className='degrees' data-testid='degrees'>
          o
        </sup>
        <sup className='unit' data-testid='unit'>
          {unit === 'metric' ? 'C' : 'F'}
        </sup>
      </p>
      <div className='bottom'>
        <div className='bottom-item'>
          <span>pressure</span>
          <span data-testid='pressure'>{pressure} hPa</span>
        </div>
        <div className='bottom-item'>
          <span>humidity</span>
          <span data-testid='humidity'>{humidity}%</span>
        </div>
      </div>
    </div>
    <div className='additional'>
      <p>{overcast}</p>
      <img
        src={icons[overallCast.toLowerCase()]}
        alt='weather'
        data-testid='card-image'
      />
    </div>
  </div>
);

export default Card;
