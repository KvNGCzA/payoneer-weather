import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./Main.scss";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  RadioGroup,
  Tooltip,
  Radio,
} from "@material-ui/core";
import Chart from "../Chart/Chart";
import Pagination from "../Pagination/Pagination";
import {
  FETCH_WEATHER_REQUESTED,
  TOGGLE_LOADING,
} from "../../reducers/constants";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";

const regions = [
  "Berlin",
  "Munich",
  "Hamburg",
  "Leipzig",
  "Dresden",
  "Heidelberg",
  "Stuttgart",
];

class Main extends Component {
  constructor() {
    super();

    this.state = {
      unit: "imperial",
      state: "Munich",
      countryCode: "de",
      pageIndex: 0,
      pageCount: 3,
      datasets: null,
      chartDate: null,
    };
  }

  componentDidMount() {
    this.props.fetchWeatherData({ ...this.state });
  }

  handleSelect = (event) => {
    const { state, unit, pageIndex } = this.state;

    this.setState(
      {
        state: event.target.value,
        pageIndex: 0,
        unit: "imperial",
      },
      () => {
        this.props.toggleLoading();
        this.props.fetchWeatherData({
          ...this.state,
          unit: "imperial",
          state: event.target.value,
          successCallback: () =>
            this.setState({ datasets: null, chartDate: null }),
          failureCallback: () =>
            this.handleSelectFailure({ state, unit, pageIndex }),
        });
      }
    );
  };

  handleRadioButtons = (event) => {
    const { unit } = this.state;

    this.setState({ unit: event.target.value }, () => {
      this.props.toggleLoading();
      this.props.fetchWeatherData({
        ...this.state,
        unit: event.target.value,
        successCallback: this.handleCardClick,
        failureCallback: () => this.handleRadioFailure(unit),
      });
    });
  };

  handleSelectFailure = (params) => {
    this.setState({ ...params });
  };

  handleRadioFailure = (unit) => {
    this.setState({ unit });
  };

  handlePagination = () => {
    const { order } = this.props.weatherData;
    const pageIndex = this.state.pageIndex ? 0 : 1;
    const start = pageIndex ? 3 : 0;
    const end = start + 3;
    const { length: pageCount } = order.slice(start, end);

    this.setState({ pageIndex, pageCount });
  };

  handleCardClick = (date, autoScroll = true) => {
    const { label: oldLabel } = this.state.datasets?.datasets[0] || {};
    const labels = [];
    const data = [];
    const label = `${date} (${
      this.state.unit === "imperial" ? "Degrees Fahrenheit" : "Degrees Celsius"
    })`;

    if (oldLabel === label && date === this.state.chartDate) {
      return;
    }

    const { fiveDayData } = this.props.weatherData;
    const dayData = fiveDayData[date];

    // Prepare chart dataset
    dayData.forEach((currentTime) => {
      labels.push(currentTime.dt_txt.split(" ")[1]);
      data.push(currentTime.main.temp);
    });

    const datasets = {
      labels,
      datasets: [
        {
          data,
          label,
          backgroundColor: "#FF4800",
          borderWidth: 0,
          hoverBackgroundColor: "#399BDA",
        },
      ],
    };

    this.setState({ datasets, chartDate: date }, () => {
      if (autoScroll) {
        // scroll to chart after updating
        // good for mobile users
        window.scroll({
          top: document.body.scrollHeight,
          left: 0,
          behavior: "smooth",
        });
      }
    });
  };

  renderRadioButtons = () => {
    return (
      <FormControl
        component="fieldset"
        className="custom-fieldset"
        data-testid="temp-selector"
      >
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

    // Determine what page cards should start from
    const start = !this.state.pageIndex ? this.state.pageIndex : 3;
    const end = start + 3;

    return (
      order &&
      order.slice(start, end).map((current) => {
        const daily = dailyAverages[current];

        return (
          <Card
            isActive={this.state.chartDate === current}
            key={current}
            state={this.state.state}
            date={current}
            temp={daily.temp}
            pressure={daily.pressure}
            humidity={daily.humidity}
            overcast={daily.overcast}
            unit={this.state.unit}
            overallCast={daily.overallCast}
            handleCardClick={() => this.handleCardClick(current)}
          />
        );
      })
    );
  }

  renderChartPlaceholder = () => {
    return (
      <div className="chart-placeholder">
        <p>Please click on a weather card to see the days statistics</p>
      </div>
    );
  };

  renderError = () => {
    return (
      <p className="error">
        There was a problem fetching the weather data at this moment!!!
      </p>
    );
  };

  renderSelect = () => {
    return (
      <FormControl className="city-select">
        <InputLabel htmlFor="grouped-select">City</InputLabel>
        <Select
          value={this.state.state}
          id="grouped-select"
          onChange={this.handleSelect}
        >
          {regions.map((region) => (
            <MenuItem value={region} key={region}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  renderBody = () => {
    return (
      <Fragment>
        <div className="filters">
          <div className="location">{this.renderSelect()}</div>
          <div className="unit">{this.renderRadioButtons()}</div>
        </div>

        <div className="card-parent">
          <div
            id="cards"
            className={`cards${this.state.pageCount < 3 ? " underThree" : ""}`}
            data-testid="cards"
          >
            {this.renderCards()}
          </div>
          <Pagination
            handlePagination={this.handlePagination}
            pageIndex={this.state.pageIndex}
          />
        </div>

        <div className="graph">
          {this.state.datasets ? (
            <Chart datasets={this.state.datasets} />
          ) : (
            this.renderChartPlaceholder()
          )}
        </div>
      </Fragment>
    );
  };

  render() {
    const body =
      this.props.weatherData.order && this.props.weatherData.order.length
        ? this.renderBody()
        : this.renderError();

    return this.props.loading ? (
      <Loader />
    ) : (
      <div className="main">
        <div className="content-body">{body}</div>
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
