import React, { Component } from "react";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import {
  FETCH_WEATHER_REQUESTED,
  TOGGLE_LOADING,
} from "../../reducers/constants";
import Card from "../Card/Card";
import "./Main.scss";
import chevronLeft from "../../assets/icons/chevron-left.svg";
import chevronRight from "../../assets/icons/chevron-right.svg";
import Loader from "../Loader/Loader";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      unit: "imperial",
      state: "Munich",
      countryCode: "de",
      pageIndex: 0,
      pageCount: 3,
    };
  }

  componentDidMount() {
    this.props.fetchWeatherData({ ...this.state });
  }

  handleRadioButtons = (event) => {
    this.setState(
      { unit: event.target.value, pageCount: 3 },
      () => {
        this.props.toggleLoading();
        this.props.fetchWeatherData({ ...this.state });
      }
    );
  };

  handlePagination = () => {
    const { order } = this.props.weatherData;
    const pageIndex = this.state.pageIndex ? 0 : 1;
    const start = !this.state.pageIndex ? this.state.pageIndex : 3;
    const end = start + 3;
    const { length: pageCount } = order.slice(start, end);

    this.setState({ pageIndex, pageCount });
  };

  renderRadioButtons = () => {
    return (
      <FormControl component="fieldset" className="custom-fieldset">
        <RadioGroup
          aria-label="unit"
          name="unit"
          value={this.state.unit}
          onChange={this.handleRadioButtons}
          className="custom-radio"
        >
          <Tooltip title="Celsius">
            <FormControlLabel
              value="metric"
              control={<Radio />}
              label="Celsius"
            />
          </Tooltip>
          <Tooltip title="Fahrenheit">
            <FormControlLabel
              value="imperial"
              control={<Radio />}
              label="Fahrenheit"
            />
          </Tooltip>
        </RadioGroup>
      </FormControl>
    );
  };

  renderCards() {
    const { order, dailyAverages } = this.props.weatherData;
    const start = !this.state.pageIndex ? this.state.pageIndex : 3;
    const end = start + 3;

    return (
      order &&
      order.slice(start, end).map((current) => {
        const daily = dailyAverages[current];

        return (
          <Card
            key={current}
            state={this.state.state}
            date={current}
            temp={daily.temp}
            pressure={daily.pressure}
            humidity={daily.humidity}
            cast={daily.cast}
            unit={this.state.unit}
            overall={daily.overall}
          />
        );
      })
    );
  }

  renderPagination = () => {
    return (
      <div className="card-control">
        <button
          onClick={this.handlePagination}
          style={{
            visibility: this.state.pageIndex ? "visible" : "hidden",
          }}
        >
          <img src={chevronLeft} alt="chevron left" />
        </button>
        <button
          onClick={this.handlePagination}
          style={{
            visibility: !this.state.pageIndex ? "visible" : "hidden",
          }}
        >
          <img src={chevronRight} alt="chevron right" />
        </button>
      </div>
    );
  };

  render() {
    return this.props.loading ? (
      <Loader />
    ) : (
      <div className="main">
        <div className="content-body">
          <div className="filters">
            <div className="location"></div>
            <div className="unit">
              {this.renderRadioButtons()}
            </div>
          </div>

          <div className="card-parent">
            <div
              id="cards"
              className={`cards${
                this.state.pageCount < 3 ? " underThree" : ""
              }`}
            >
              {this.renderCards()}
            </div>
            {this.renderPagination()}
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
    toggleLoading: () => {
      dispatch({ type: TOGGLE_LOADING });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
