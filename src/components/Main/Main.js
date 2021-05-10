import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './Main.scss';
import {
  FETCH_WEATHER_REQUESTED,
  TOGGLE_LOADING,
} from '../../reducers/constants';
import BarChart from '../barChart/BarChart';
import Pagination from '../pagination/Pagination';
import Card from '../card/Card';
import Loader from '../loader/Loader';
import RadioButton from '../radioButton/RadioButton';
import DropdownSelect from '../dropdownSelect/DropdownSelect';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      unit: 'imperial',
      region: 'Munich',
      countryCode: 'de',
      pageIndex: 0,
      pageCount: 3,
      datasets: null,
      chartDate: null,
      regions: [
        'Berlin',
        'Munich',
        'Hamburg',
        'Leipzig',
        'Dresden',
        'Heidelberg',
        'Stuttgart',
      ],
      units: [
        {
          value: 'metric',
          title: 'Celsius',
        },
        {
          value: 'imperial',
          title: 'Fahrenheit',
        },
      ],
    };
  }

  componentDidMount() {
    this.props.fetchWeatherData({ ...this.state });
  }

  handleSelect = event => {
    const { region, unit, pageIndex } = this.state;

    this.setState(
      {
        region: event.target.value,
        pageIndex: 0,
      },
      () => {
        this.props.toggleLoading();
        this.props.fetchWeatherData({
          ...this.state,
          region: event.target.value,
          successCallback: () =>
            this.setState({ datasets: null, chartDate: null }),
          failureCallback: () =>
            this.handleSelectFailure({ region, unit, pageIndex }),
        });
      }
    );
  };

  handleChange = event => {
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

  handleSelectFailure = params => {
    this.setState({ ...params });
  };

  handleRadioFailure = unit => {
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
    const { datasets: currentDataSet, unit, chartDate, region } = this.state;
    const { label: oldLabel } = currentDataSet?.datasets[0] || {};
    const label = `${region} ${date} (${
      unit === 'imperial' ? 'Degrees Fahrenheit' : 'Degrees Celsius'
    })`;

    if (oldLabel === label && date === chartDate) {
      return;
    }

    const datasets = this.generateChartDatasets({ date, label });

    this.setState({ datasets, chartDate: date }, () => {
      if (autoScroll) {
        window.scroll({
          top: document.body.scrollHeight,
          left: 0,
          behavior: 'smooth',
        });
      }
    });
  };

  generateChartDatasets = ({ date, label }) => {
    const labels = [];
    const data = [];
    const { fiveDayData } = this.props.weatherData;
    const dayData = fiveDayData[date];

    // Prepare chart dataset
    dayData.forEach(currentTime => {
      labels.push(currentTime.dt_txt.split(' ')[1]);
      data.push(currentTime.main.temp);
    });

    return {
      labels,
      datasets: [
        {
          data,
          label,
          backgroundColor: '#FF4800',
          borderWidth: 0,
          hoverBackgroundColor: '#399BDA',
        },
      ],
    };
  };

  renderCards({ weatherData }) {
    const { order, dailyAverages } = weatherData;
    const { chartDate, region, unit, pageIndex, pageCount } = this.state;

    // Determine what page cards should start from
    const start = !pageIndex ? pageIndex : 3;
    const end = start + 3;

    return (
      <div
        id='cards'
        className={`cards${pageCount < 3 ? ' underThree' : ''}`}
        data-testid='cards'
      >
        {order &&
          order.slice(start, end).map(current => {
            const daily = dailyAverages[current];

            return (
              <Card
                isActive={chartDate === current}
                key={current}
                region={region}
                date={current}
                temp={daily.temp}
                pressure={daily.pressure}
                humidity={daily.humidity}
                overcast={daily.overcast}
                unit={unit}
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
      <div className='chart-placeholder'>
        <p>Please click on a weather card to see the days statistics</p>
      </div>
    );
  };

  renderChart = () => {
    return (
      <div className='chart'>
        {this.state.datasets ? (
          <BarChart datasets={this.state.datasets} />
        ) : (
          this.renderChartPlaceholder()
        )}
      </div>
    );
  };

  renderFilters = () => {
    const { regions, region, unit, units } = this.state;

    return (
      <div className='filters'>
        <DropdownSelect
          regions={regions}
          handleSelect={this.handleSelect}
          value={region}
        />
        <RadioButton
          value={unit}
          handleChange={this.handleChange}
          units={units}
        />
      </div>
    );
  };

  renderSuccessBody = props => {
    return (
      <Fragment>
        {this.renderFilters()}

        <div className='card-parent'>
          {this.renderCards(props)}
          <Pagination
            handlePagination={this.handlePagination}
            pageIndex={this.state.pageIndex}
          />
        </div>

        {this.renderChart()}
      </Fragment>
    );
  };

  renderErrorBody = order => {
    return (
      <p className='error'>
        {!order
          ? 'There was a problem fetching the weather data at this moment!!!'
          : 'There is no weather data to display at the moment'}
      </p>
    );
  };

  renderBody = props => {
    const { order } = props.weatherData;

    return (
      <div className='main'>
        <div className='content-body'>
          {order && order.length
            ? this.renderSuccessBody(props)
            : this.renderErrorBody(order)}
        </div>
      </div>
    );
  };

  render() {
    return this.props.loading ? <Loader /> : this.renderBody(this.props);
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  fetchWeatherData: data => {
    dispatch({ type: FETCH_WEATHER_REQUESTED, data });
  },
  toggleLoading: () => {
    dispatch({ type: TOGGLE_LOADING });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
