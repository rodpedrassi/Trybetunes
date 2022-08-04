import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favorites: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const favoritos = await getFavoriteSongs();
    this.setState({ favorites: favoritos, loading: false });
  }

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  async handleOnChange(music, { target }) {
    const { getFavorites = () => {} } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ loading: false, favorites: await getFavoriteSongs() });
    await getFavorites();
  }

  render() {
    const {
      music: { trackName, previewUrl, trackId },
    } = this.props;
    const { music } = this.props;
    const { loading, favorites } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <div className="music-track">
        <h5>{trackName}</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            name={ trackId }
            id={ trackId }
            onChange={ (e) => this.handleOnChange(music, e) }
            checked={ favorites.some((song) => song.trackId === music.trackId) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape.isRequired,
  getFavorites: PropTypes.func.isRequired,
};
