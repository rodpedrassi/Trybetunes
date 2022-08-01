import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  render() {
    return (
      <section className="Sidebar">
        <h4>Trybe Tunes</h4>
        <nav>
          <Link to="/">Login</Link>
          <Link to="/search">Search</Link>
          <Link to="/album">Album</Link>
          <Link to="/favorites">Favoritos</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/profile/edit">Editar Profile</Link>
        </nav>
      </section>
    );
  }
}

export default Sidebar;
