import "./Card.scss";
import thunderstorm from "../../assets/icons/thunderstorm_day.png";

const Card = ({ state, date, temp, pressure, humidity, cast }) => {
  return (
    <div className="card">
      <div className="outline"></div>
      <div className="details">
        <p className="state">{state}</p>
        <p className="date">{date}</p>
        <p className="temp">
          {temp}<sup className="degrees">o</sup>
          <sup className="unit">C</sup>
        </p>
        <div className="bottom">
          <div className="bottom-item">
            <span>pressure</span>
            <span>{pressure} hPa</span>
          </div>
          <div className="bottom-item">
            <span>humidity</span>
            <span>{humidity}%</span>
          </div>
        </div>
      </div>
      <div className="additional">
        <p>{cast}</p>
        <img src={thunderstorm} alt="weather" />
      </div>
    </div>
  );
};

export default Card;
