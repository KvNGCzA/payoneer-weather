import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./Main.scss";
import {
  FETCH_WEATHER_REQUESTED,
  TOGGLE_LOADING,
} from "../../reducers/constants";
import BarChart from "../barChart/BarChart";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import Loader from "../loader/Loader";
import RadioButton from "../radioButton/RadioButton";
import DropdownSelect from "../dropdownSelect/DropdownSelect";

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
      regions: [
        "Berlin",
        "Munich",
        "Hamburg",
        "Leipzig",
        "Dresden",
        "Heidelberg",
        "Stuttgart",
      ],
      units: [
        {
          value: "metric",
          title: "Celsius",
        },
        {
          value: "imperial",
          title: "Fahrenheit",
        },
      ],
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
      },
      () => {
        this.props.toggleLoading();
        this.props.fetchWeatherData({
          ...this.state,
          state: event.target.value,
          successCallback: () =>
            this.setState({ datasets: null, chartDate: null }),
          failureCallback: () =>
            this.handleSelectFailure({ state, unit, pageIndex }),
        });
      }
    );
  };

  handleChange = (event) => {
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

  getChartDatasets = ({ date, label }) => {
    const labels = [];
    const data = [];
    const { fiveDayData } = this.props.weatherData;
    const dayData = fiveDayData[date];

    // Prepare chart dataset
    dayData.forEach((currentTime) => {
      labels.push(currentTime.dt_txt.split(" ")[1]);
      data.push(currentTime.main.temp);
    });

    return {
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
  }

  handleCardClick = (date, autoScroll = true) => {
    const { label: oldLabel } = this.state.datasets?.datasets[0] || {};
    const label = `${date} (${
      this.state.unit === "imperial" ? "Degrees Fahrenheit" : "Degrees Celsius"
    })`;

    if (oldLabel === label && date === this.state.chartDate) {
      return;
    }

    const datasets = this.getChartDatasets({ date, label })

    this.setState({ datasets, chartDate: date }, () => {
      if (autoScroll) {
        window.scroll({
          top: document.body.scrollHeight,
          left: 0,
          behavior: "smooth",
        });
      }
    });
  };

  renderCards() {
    const { order, dailyAverages } = this.props.weatherData;

    // Determine what page cards should start from
    const start = !this.state.pageIndex ? this.state.pageIndex : 3;
    const end = start + 3;

    return (
      <div
        id="cards"
        className={`cards${this.state.pageCount < 3 ? " underThree" : ""}`}
        data-testid="cards"
      >
        {order &&
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
          })}
      </div>
    );
  }

  renderChartPlaceholder = () => {
    return (
      <div className="chart-placeholder">
        <p>Please click on a weather card to see the days statistics</p>
      </div>
    );
  };

  renderChart = () => {
    return (
      <div className="chart">
        {this.state.datasets ? (
          <BarChart datasets={this.state.datasets} />
        ) : (
          this.renderChartPlaceholder()
        )}
      </div>
    );
  };

  renderFilters = () => {
    return (
      <div className="filters">
        <DropdownSelect
          regions={this.state.regions}
          handleSelect={this.handleSelect}
          value={this.state.state}
        />
        <RadioButton
          value={this.state.unit}
          handleChange={this.handleChange}
          units={this.state.units}
        />
      </div>
    );
  };

  renderSuccessBody = () => {
    return (
      <Fragment>
        {this.renderFilters()}

        <div className="card-parent">
          {this.renderCards()}
          <Pagination
            handlePagination={this.handlePagination}
            pageIndex={this.state.pageIndex}
          />
        </div>

        {this.renderChart()}
      </Fragment>
    );
  };

  renderErrorBody = () => {
    return (
      <p className="error">
        There was a problem fetching the weather data at this moment!!!
      </p>
    );
  };

  renderBody = () => {
    return (
      <div className="main">
        <div className="content-body">
          {this.props.weatherData.order && this.props.weatherData.order.length
            ? this.renderSuccessBody()
            : this.renderErrorBody()}
        </div>
      </div>
    );
  };

  render() {
    return this.props.loading ? <Loader /> : this.renderBody();
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWeatherData: (data) => {
    dispatch({ type: FETCH_WEATHER_REQUESTED, data });
  },
  toggleLoading: () => {
    dispatch({ type: TOGGLE_LOADING });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
