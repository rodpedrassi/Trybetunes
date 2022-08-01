import React, { Component } from 'react';
import trybeLogo from '../assets/logo.svg';
import toggleButtonImage from '../assets/list.svg';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <button className="toggle-button" type="button">
          <img src={ toggleButtonImage } alt="Toggle sidebar button" />
        </button>
        <img src={ trybeLogo } alt="Trybe Logo" />

        <h4>Trybe Tunes</h4>
      </header>
    );
  }
}

export default Header;
