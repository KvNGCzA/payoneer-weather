import { Component } from "react";
import { connect } from "react-redux";
import { FETCH_WEATHER_REQUESTED } from "../../reducers/data";

class Main extends Component {
  componentDidMount() {
    this.props.fetchWeatherData();
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
