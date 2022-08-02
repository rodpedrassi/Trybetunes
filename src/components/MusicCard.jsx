import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: false,
  };

  async addFavSong(music) {
    const { isChecked } = this.state;
    if (!isChecked) {
      this.setState({ loading: true });
      await addSong(music);
    }
    this.setState({ isChecked: !isChecked });
    this.setState({ loading: false });
  }

  render() {
    const {
      music: { trackName, previewUrl, trackId },
    } = this.props;
    const music = this.props;
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
            onChange={ () => this.addFavSong(music) }
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
