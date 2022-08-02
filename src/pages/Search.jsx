import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    search: '',
    isButtonDisabled: true,
  }

  handleChange = ({ name, value }) => {
    this.setState(
      {
        [name]: value,
      }, this.handleButtonDisable,
    );
  };

  handleButtonDisable = () => {
    const { search } = this.state;
    console.log(search);
    const minLengthSearch = 2;
    const checkSearchInput = search.length < minLengthSearch;
    this.setState({
      isButtonDisabled: checkSearchInput,
    });
  };

  onSearchClick = () => {
    console.log('alooooooooooo');
  }

  render() {
    const { search, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
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
            onClick={ this.onSearchClick }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
