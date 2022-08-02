import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    buttonIsDisabled: true,
    inputUsuario: '',
    loading: false,
  };

  didPressClick = async () => {
    const { inputUsuario } = this.state;
    this.setState({ loading: true });
    await createUser({ name: inputUsuario });

    const { history } = this.props;
    history.push('/search');
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
    const { inputUsuario } = this.state;
    const minLengthUser = 3;
    const checkUsuarioInput = inputUsuario.length < minLengthUser;
    this.setState({
      buttonIsDisabled: checkUsuarioInput,
    });
  };

  // componentWillUnmount = () => {
  //   const { inputUsuario } = this.state;
  //   localStorage.setItem('user', inputUsuario);
  // }

  render() {
    const { buttonIsDisabled, inputUsuario, loading } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <div data-testid="page-login">
        <h2>Login</h2>
        <label htmlFor="inputUsuario">
          Usuário:
          <input
            type="text"
            name="inputUsuario"
            id="inputUsuario"
            data-testid="login-name-input"
            placeholder="Digite o nome do usuário"
            value={ inputUsuario }
            onChange={ ({ target }) => this.handleChange(target) }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ buttonIsDisabled }
            onClick={ this.didPressClick }
          >
            Entrar
          </button>
        </label>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape,
  push: PropTypes.func,
};
Login.defaultProps = {
  history: PropTypes.objectOf(PropTypes.any),
  push: PropTypes.func,
};
