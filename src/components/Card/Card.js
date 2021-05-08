import React from "react";
import "./Card.scss";
import thunderstorm from "../../assets/icons/thunderstorm_day.png";
import clear from "../../assets/icons/clear_day.png";
import rain from "../../assets/icons/rain_day.png";
import drizzle from "../../assets/icons/drizzle_day.png";
import snow from "../../assets/icons/snow_day.png";
import atmosphere from "../../assets/icons/atmosphere_day.png";
import clouds from "../../assets/icons/clouds_day.png";

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
  state,
  date,
  temp,
  pressure,
  humidity,
  overcast,
  unit,
  overall,
  handleCardClick,
  isActive,
}) => {
  return (
    <div
      className={`card${isActive ? " active" : ""}`}
      onClick={handleCardClick}
    >
      <div className="outline"></div>
      <div className="details">
        <p className="state">{state}</p>
        <p className="date">{date}</p>
        <p className="temp">
          {temp}
          <sup className="degrees">o</sup>
          <sup className="unit">{unit === "metric" ? "C" : "F"}</sup>
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
        <p>{overcast}</p>
        <img src={icons[overall.toLowerCase()]} alt="weather" />
      </div>
    </div>
  );
};

export default Card;
