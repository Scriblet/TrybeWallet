import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { loginButton } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.eventHandle = this.eventHandle.bind(this);
    this.validInputs = this.validInputs.bind(this);
    this.redirectWallet = this.redirectWallet.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  eventHandle({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  validInputs() {
    const { email, password } = this.state;
    const six = 6;
    const re = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    return re.test(email) && password.length >= six;
  }

  redirectWallet() {
    const { email } = this.state;
    const { history, emailText } = this.props;
    history.push('/carteira');
    emailText(email);
  }

  render() {
    const { email, password } = this.state;
    return (
      <Form style={ { margin: '32px' } }>
        <h1>Login Page</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>
            Email
            <Form.Control
              type="email"
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ this.eventHandle }
            />
          </Form.Label>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>
            Password
            <Form.Control
              type="password"
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ this.eventHandle }
            />
          </Form.Label>
        </Form.Group>
        <Button
          type="button"
          disabled={ !this.validInputs() }
          onClick={ this.redirectWallet }
        >
          Entrar
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  emailText: (email) => dispatch(loginButton(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  emailText: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
