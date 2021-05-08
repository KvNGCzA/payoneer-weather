import React from 'react';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader-body">
        <div className="loader-container">

          <div className="loader-filters">
            <div className="gradient loader-location"></div>
            <div className="gradient loader-temp"></div>
          </div>

          <div className="loader-cards">
            <div className="gradient loader-card"></div>
            <div className="gradient loader-card"></div>
            <div className="gradient loader-card"></div>
          </div>

          <div className="loader-pagination">
            <div className="gradient arrow-left"></div>
            <div className="gradient arrow-right"></div>
          </div>

          <div className="loader-chart">
            <div className="gradient loader-bar"></div>
            <div className="gradient loader-bar"></div>
            <div className="gradient loader-bar"></div>
            <div className="gradient loader-bar"></div>
            <div className="gradient loader-bar"></div>
            <div className="gradient loader-bar"></div>
            <div className="gradient loader-bar"></div>
            <div className="gradient loader-bar"></div>
            <div className="gradient loader-bar"></div>
          </div>
        </div>
      </div>
  );
}

export default Loader;
