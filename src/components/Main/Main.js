import { Component } from "react";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import { FETCH_WEATHER_REQUESTED, TOGGLE_LOADING } from "../../reducers/constants";
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
      showLeft: false,
      showRight: true,
    };
  }

  componentDidMount() {
    this.props.fetchWeatherData({ ...this.state });
  }

  componentDidUpdate() {
    // console.log("this.props", this.props);
  }

  handleScroll = (direction) => {
    const element = document.getElementById("cards");

    element.scroll({
      top: 0,
      left: direction === "right" ? element.scrollWidth : 0,
      behavior: "smooth",
    });
  }

  handleOnScroll = (e) => {
    if (e.target.scrollLeft === 0) {
      this.setState({ showLeft: false });
      return;
    }

    if (e.target.scrollLeft + e.target.clientWidth === e.target.scrollWidth) {
      this.setState({ showRight: false });
      return;
    }

    if (!this.state.showLeft || !this.state.showRight) {
      this.setState({ showLeft: true, showRight: true });
    }
  };

  handleRadioButtons = (event) => {
    this.setState(
      { unit: event.target.value, showLeft: false, showRight: true },
      () => {
        this.props.toggleLoading();
        this.props.fetchWeatherData({ ...this.state });
      }
    );
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
  }

  renderCards() {
    const { order, dailyAverages } = this.props.weatherData;

    const cards =
      order &&
      order.map((current) => {
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
      });

    return cards;
  }

  renderPagination = () => {
    return (
      <div className="card-control">
        <button
          onClick={() => this.handleScroll("left")}
          style={{
            visibility: this.state.showLeft ? "visible" : "hidden",
          }}
        >
          <img src={chevronLeft} alt="chevron left" />
        </button>
        <button
          onClick={() => this.handleScroll("right")}
          style={{
            visibility: this.state.showRight ? "visible" : "hidden",
          }}
        >
          <img src={chevronRight} alt="chevron right" />
        </button>
      </div>
    );
  }

  render() {
    return this.props.loading ? (
      <Loader />
    ) : (
      <div className="main">
        <div className="content-body">
          <div className="filters">
            <div className="location"></div>
            <div className="unit">{this.renderRadioButtons()}</div>
          </div>

          <div className="card-parent">
            <div id="cards" className="cards" onScroll={this.handleOnScroll}>
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
