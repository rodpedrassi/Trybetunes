import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import '../css/search.css';

export default class Search extends Component {
  state = {
    search: '',
    isButtonDisabled: true,
    loading: false,
    listaArtistas: [],
    hasntFind: false,
  };

  handleChange = ({ name, value }) => {
    this.setState(
      {
        [name]: value,
      },
      this.handleButtonDisable,
    );
  };

  handleButtonDisable = () => {
    const { search } = this.state;
    const minLengthSearch = 2;
    const checkSearchInput = search.length < minLengthSearch;
    this.setState({
      isButtonDisabled: checkSearchInput,
    });
  };

  onSearchClick = async (e) => {
    e.preventDefault();
    this.setState({ search: '', loading: true });
    const { search } = this.state;
    const newListaArtistas = await searchAlbumsAPIs(search);
    this.setState({ loading: false });
    if (newListaArtistas.length === 0) {
      this.setState({ hasntFind: true });
    } else {
      this.setState({ listaArtistas: newListaArtistas });
    }
  };

  render() {
    const {
      search,
      isButtonDisabled,
      loading,
      listaArtistas,
      hasntFind,
    } = this.state;
    return (
      <div data-testid="page-search">
        {loading ? (
          <Loading />
        ) : (
          <form action="" method="get">
            <label htmlFor="search">
              Pesquisar:
              <input
                type="text"
                name="search"
                id="search"
                data-testid="search-artist-input"
                placeholder="Digite o nome do artista"
                value={ search }
                onChange={ ({ target }) => this.handleChange(target) }
              />
            </label>
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ isButtonDisabled }
              onClick={ (e) => this.onSearchClick(e) }
            >
              Pesquisar
            </button>
          </form>
        )}
        <div className="content">
          {listaArtistas.length === 0 && hasntFind ? (
            <h4>Nenhum álbum foi encontrado</h4>
          ) : (
            <ul>
              <h4>
                Resultado de álbuns de:
                {' '}
                { search }
              </h4>
              {listaArtistas.map((artista) => (
                <Link
                  to={ `/album/${artista.collectionId}` }
                  key={ artista.collectionId }
                  data-testid={ `link-to-album-${artista.collectionId}` }
                >
                  <li className="artist-box" key={ artista.artistId }>
                    <span>{artista.artistName}</span>
                    <img src={ artista.artworkUrl100 } alt={ artista.artistName } />
                    <span>{artista.collectionName}</span>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
