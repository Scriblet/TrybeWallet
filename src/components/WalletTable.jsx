import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { excludesRow, toggleForm } from '../actions';

class WalletTable extends React.Component {
  filterName(currentExpense) {
    const { expensesState } = this.props;
    const currentCurrency = expensesState[0].exchangeRates[currentExpense.currency];
    return currentCurrency.name;
  }

  filterExchange(currentExpense) {
    const { expensesState } = this.props;
    const currentCurrency = expensesState[0].exchangeRates[currentExpense.currency];
    return parseFloat(currentCurrency.ask).toFixed(2);
  }

  convertedValue(currentExpense) {
    const { expensesState } = this.props;
    const currentCurrency = expensesState[0].exchangeRates[currentExpense.currency];
    const newValue = currentCurrency.ask * currentExpense.value;
    return parseFloat(newValue).toFixed(2);
  }

  deleteRow(id) {
    const { deleteRowDispatch } = this.props;
    deleteRowDispatch(id);
  }

  toggleForm(currentId) {
    const { toggleFormDispatch } = this.props;
    toggleFormDispatch(true, currentId);
  }

  render() {
    const { expensesState } = this.props;
    return (
      <div>
        <Table striped hover>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expensesState.map((expense) => (
              <tr key={ expense }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{`${parseFloat(expense.value)}`}</td>
                <td>{this.filterName(expense)}</td>
                <td>{`${this.filterExchange(expense)}`}</td>
                <td>{this.convertedValue(expense)}</td>
                <td>Real</td>
                <td>
                  <Button
                    size="sm"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.toggleForm(expense.id) }
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteRow(expense.id) }
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteRowDispatch: (excludedRow) => dispatch(excludesRow(excludedRow)),
  toggleFormDispatch: (status, currentId) => dispatch(toggleForm(status, currentId)),
});

WalletTable.propTypes = {
  expensesState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  deleteRowDispatch: PropTypes.func.isRequired,
  toggleFormDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
