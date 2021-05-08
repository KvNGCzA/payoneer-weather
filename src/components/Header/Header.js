import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <header>
        <div>
          <img src={logo} alt="payoneer logo" className="header-logo" />
        </div>
      </header>
    );
  }
}

export default Header;
