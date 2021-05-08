import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FETCH_WEATHER_REQUESTED } from "../../reducers/data";
import Card from "../Card/Card";
import "./Main.scss";
import chevronLeft from "../../assets/icons/chevron-left.svg";
import chevronRight from "../../assets/icons/chevron-right.svg";
import { isEqual } from "lodash";

// celcius - metric
// farenheit - imperial
// pressure hpa
class Main extends Component {
  constructor() {
    super();
    this.state = {
      unit: "metric",
      state: "Munich",
      countryCode: "de"
    };
  }

  componentDidMount() {
    this.props.fetchWeatherData({ ...this.state });
  }

  componentDidUpdate() {
    console.log("this.props", this.props);
  }

  generateCards() {
    const { order, dailyAverages } = this.props.weatherData;

    const cards = order && order.map((current) => {
      const daily = dailyAverages[current];
      return <Card
        key={current}
        state={this.state.state}
        date={current}
        temp={daily.temp}
        pressure={daily.pressure}
        humidity={daily.humidity}
        cast={daily.cast}
      />;
    });

    return cards;
  }

  render() {
    console.log("this.state", this.state);
    return (
      <div className="main">
        <div className="content-body">
          <div className="filters">
            <div className="location"></div>
            <div className="unit"></div>
          </div>

          <div className="card-parent">
            <div className="cards">{this.generateCards()}</div>
            <div className="card-control">
              <button>
                <img src={chevronLeft} alt="chevron left" />
              </button>
              <button>
                <img src={chevronRight} alt="chevron right" />
              </button>
            </div>
          </div>

          <div className="graph"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeatherData: (data) => {
      dispatch({ type: FETCH_WEATHER_REQUESTED, data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
