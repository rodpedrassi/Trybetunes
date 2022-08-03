import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    artistName: '',
    albunName: '',
    artwork: '',
    albumMusics: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const musicsByAlbunId = await getMusics(id);
    this.setState({
      artistName: musicsByAlbunId[0].artistName,
      albunName: musicsByAlbunId[0].collectionName,
      artwork: musicsByAlbunId[0].artworkUrl100,
      albumMusics: musicsByAlbunId,
    });
    // console.log(musicsByAlbunId[0].artistName);
  }

  render() {
    const { artistName, albunName, artwork, albumMusics } = this.state;
    const filteredMusics = albumMusics.filter((music) => music.kind === 'song');
    return (

      <div data-testid="page-album">
        <h4 data-testid="artist-name">{artistName}</h4>
        <h4 data-testid="album-name">{albunName}</h4>
        <img src={ artwork } alt="" />
        {filteredMusics.map((music) => (
          <div key={ music.trackId } className="musicTracks">
            <MusicCard music={ music } />
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};
