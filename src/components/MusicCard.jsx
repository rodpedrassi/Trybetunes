import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: false,
    favorites: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const favoritos = await getFavoriteSongs();
    this.setState({ favorites: favoritos }, () => {
      const { favorites } = this.state;
      const { music } = this.props;

      const checkFav = favorites.some((song) => song.trackId === music.trackId);
      this.setState({ isChecked: checkFav });
    });
    this.setState({ loading: false });
  }

  async addRemoveFavSong(music) {
    const { isChecked } = this.state;
    this.setState({ loading: true });
    if (!isChecked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ isChecked: !isChecked });
    this.setState({ loading: false });
  }

  render() {
    const {
      music: { trackName, previewUrl, trackId },
    } = this.props;
    const { music } = this.props;
    const { loading, isChecked } = this.state;

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
            onChange={ () => this.addRemoveFavSong(music) }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape.isRequired,
};
