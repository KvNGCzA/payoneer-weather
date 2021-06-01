import { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import './Landing.scss';
import BarChart from '../barChart/BarChart';
import Card from '../card/Card';
import DropdownSelect from '../dropdownSelect/DropdownSelect';
import Loader from '../loader/Loader';
import Pagination from '../pagination/Pagination';
import RadioButton from '../radioButton/RadioButton';
import {
  FETCH_WEATHER_REQUESTED,
  TOGGLE_LOADING,
} from '../../reducers/constants';

class Landing extends Component {
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
    this.props.toggleLoading();
    this.props.fetchWeatherData({
      ...this.state,
      region: event.target.value,
      successCallback: () => {
        this.setState({
          region: event.target.value,
          pageIndex: 0,
          datasets: null,
          chartDate: null,
          pageCount: 3,
        });
      },
    });
  };

  handleChange = event => {
    this.props.toggleLoading();
    this.props.fetchWeatherData({
      ...this.state,
      unit: event.target.value,
      successCallback: () => {
        this.setState({ unit: event.target.value }, () => {
          this.state.chartDate &&
            this.handleCardClick(this.state.chartDate, false);
        });
      },
    });
  };

  handlePagination = () => {
    const pageIndex = this.state.pageIndex ? 0 : 1;
    const start = pageIndex ? 3 : 0;
    const end = start + 3;
    const { length: pageCount } = this.props.dates.slice(start, end);

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
    const dayData = this.props.allDaysData[date];

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

  renderCards({ dates, dailyAverages }) {
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
        {dates &&
          dates.slice(start, end).map(date => {
            const day = dailyAverages[date];

            return (
              <Card
                isActive={chartDate === date}
                key={date}
                region={region}
                date={date}
                temp={day.temp}
                pressure={day.pressure}
                humidity={day.humidity}
                overcast={day.overcast}
                unit={unit}
                overallCast={day.overallCast}
                handleCardClick={() => this.handleCardClick(date)}
              />
            );
          })}
      </div>
    );
  }

  renderChartPlaceholder = () => (
    <div className='chart-placeholder'>
      <p data-testid='chart-placeholder'>
        Please click on a weather card to see the days statistics
      </p>
    </div>
  );

  renderChart = () => (
    <div className='chart' data-testid='chart'>
      {this.state.datasets ? (
        <BarChart datasets={this.state.datasets} />
      ) : (
        this.renderChartPlaceholder()
      )}
    </div>
  );

  handleRefresh = () => {
    this.props.toggleLoading();
    this.props.fetchWeatherData({ ...this.state });
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
        <div class="refresh-cont">
          <button id="refresh-button" onClick={this.handleRefresh}>Refresh</button>
          <RadioButton
            value={unit}
            handleChange={this.handleChange}
            units={units}
          />
        </div>
      </div>
    );
  };

  renderSuccessBody = props => (
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

  renderFailureBody = dates => (
    <p className='error' data-testid='failure-text'>
      {!dates
        ? 'There was a problem fetching the weather data at this moment!!!'
        : 'There is no weather data to display at the moment'}
    </p>
  );

  renderBody = props => {
    const { dates } = props;

    return (
      <div className='main'>
        <div className='content-body'>
          {dates && dates.length
            ? this.renderSuccessBody(props)
            : this.renderFailureBody(dates)}
        </div>
      </div>
    );
  };

  render() {
    return this.props.loading ? <Loader /> : this.renderBody(this.props);
  }
}

const mapStateToProps = ({ loading, weatherData }) => ({
  loading,
  ...weatherData,
});

const mapDispatchToProps = dispatch => ({
  fetchWeatherData: data => {
    dispatch({ type: FETCH_WEATHER_REQUESTED, data });
  },
  toggleLoading: () => {
    dispatch({ type: TOGGLE_LOADING });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
