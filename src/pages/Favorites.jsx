import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    favSongs: [],
    loading: false,
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.getFavorites();
    this.setState({ loading: false });
  }

   getFavorites = async () => {
     const myFavSongs = await getFavoriteSongs();
     this.setState({ favSongs: myFavSongs });
   }

   render() {
     const { loading, favSongs } = this.state;
     return (
       <div data-testid="page-favorites">
         {loading ? (
           <Loading />
         ) : (
           <div>
             {favSongs.map((music) => (
               <div key={ music.trackId } className="musicTracks">
                 <MusicCard music={ music } getFavorites={ this.getFavorites } />
               </div>
             ))}
           </div>
         )}
       </div>
     );
   }
}
