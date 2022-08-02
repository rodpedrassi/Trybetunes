import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import trybeLogo from '../assets/logo.svg';
import toggleButtonImage from '../assets/list.svg';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    loading: true,
    user: 'alo',
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.getUserName();
    this.setState({ loading: false });
  }

  getUserName = async () => {
    const userName = await getUser();
    this.setState({ user: userName });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header className="Header" data-testid="header-component">
        <button className="toggle-button" type="button">
          <img src={ toggleButtonImage } alt="Toggle sidebar button" />
        </button>
        <img src={ trybeLogo } alt="Trybe Logo" />

        <h4>Trybe Tunes</h4>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/album">Album</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <Link to="/profile/edit">Editar Profile</Link>
        </nav>
        {loading
          ? (<Loading />)
          : (
            <h4 data-testid="header-user-name">
              { user.name }
            </h4>
          )}
      </header>
    );
  }
}

export default Header;
