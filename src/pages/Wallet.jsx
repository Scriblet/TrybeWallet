import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../img/logo.webp';
import Form from '../components/Form';
import WalletTable from '../components/WalletTable';
import EditForm from '../components/EditForm';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'BRL',
    };
  }

  totalValue() {
    const { expensesState } = this.props;
    const total = expensesState.reduce(
      (acc, cur) => acc
        + parseFloat(cur.value) * parseFloat(cur.exchangeRates[cur.currency].ask),
      0,
    );
    return total;
  }

  render() {
    const { currency } = this.state;
    const { email, typeForm } = this.props;
    console.log(typeForm);
    return (
      <div>
        <div
          className="header-wallet"
          style={ { color: 'white', fontFamily: 'Poppins', padding: '32px' } }
        >
          TrybeWallet
          <header>
            <img src={ logo } alt="Logo Trybe" className="logo-header" />
            <div>
              <p data-testid="email-field">{email}</p>
              <p>
                Despesa Total:
                <span data-testid="header-currency-field">{currency}</span>
                <span data-testid="total-field">{this.totalValue()}</span>
              </p>
            </div>
          </header>
          {typeForm ? <EditForm /> : <Form />}
        </div>
        <div>
          <WalletTable />
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  typeForm: PropTypes.bool.isRequired,
  expensesState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expensesState: state.wallet.expenses,
  typeForm: state.wallet.toggleForm,
});

export default connect(mapStateToProps, null)(Wallet);
