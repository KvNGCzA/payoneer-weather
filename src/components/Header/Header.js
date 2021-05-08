import { Component } from "react";
import logo from "../../assets/images/logo.png";
import './Header.scss';

class Header extends Component {
  render() {
    return (
      <header>
        <img src={logo} alt="payoneer logo" className="header-logo"/>
      </header>
    );
  }
}

export default Header;
