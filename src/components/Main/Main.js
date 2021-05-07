import { Component } from "react";
import { connect } from "react-redux";
import { FETCH_WEATHER_REQUESTED } from "../../reducers/data";
// celcius - metric
// farenheit - imperial
// pressure hpa
class Main extends Component {
  constructor() {
    super();
    this.state = {
      unit: 'metric',
      state: 'Munich',
      countryCode: 'de'
    };

  }

  componentDidMount() {
    this.props.fetchWeatherData({ ...this.state });
  }

  componentDidUpdate() {
    console.log('this.props', this.props);
  }

  render() {
    return <div>loaded...</div>
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeatherData: data => {
      dispatch({ type: FETCH_WEATHER_REQUESTED, data })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
