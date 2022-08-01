import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    buttonIsDisabled: true,
    inputUsuario: '',
  }

  didPressClick = async () => {
    const { inputUsuario } = this.state;
    const { history } = this.props;
    await createUser({ name: inputUsuario });

    history.push('/search');
  }

  handleChange = ({ name, value }) => {
    this.setState({
      [name]: value,
    }, this.handleButtonDisable);
  }

  handleButtonDisable = () => {
    const { inputUsuario } = this.state;
    const minLengthUser = 3;
    const checkUsuarioInput = inputUsuario.length < minLengthUser;
    this.setState({
      buttonIsDisabled: checkUsuarioInput,
    });
  }

  render() {
    const { buttonIsDisabled, inputUsuario } = this.state;
    return (
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
