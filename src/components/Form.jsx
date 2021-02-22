import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form as Forms, Button } from 'react-bootstrap';
import { getCurrencies, buttonExpenses } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);

    this.state = {
      methodOptions: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagOptions: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    };
  }

  async componentDidMount() {
    const { getCurrenciesDispatch } = this.props;
    await getCurrenciesDispatch();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState((previuosState) => ({
      expense: { ...previuosState.expense, [name]: value },
    }));
  }

  async buttonClick() {
    const { buttonExpensesDispatch, getCurrenciesDispatch } = this.props;
    const { expense } = this.state;
    await getCurrenciesDispatch();
    buttonExpensesDispatch(expense);
    this.setState({ expense: {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    } });
  }

  render() {
    const { currenciesState } = this.props;
    const { methodOptions, tagOptions, expense } = this.state;
    const { value, description, currency, method, tag } = expense;
    return (
      <Forms>
        <Forms.Group>
          <Forms.Label htmlFor="value-input">
            Valor:
            <Forms.Control
              type="text"
              data-testid="value-input"
              id="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </Forms.Label>
          <Forms.Label htmlFor="description-input">
            Descrição:
            <Forms.Control
              type="text"
              data-testid="description-input"
              id="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </Forms.Label>
          <Forms.Group>
            <Forms.Label>
              Moeda
              <Forms.Control
                as="select"
                className="currency-input"
                data-testid="currency-input"
                name="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                <option selected>Selecione a sua moeda</option>
                {currenciesState.map((c) => (
                  <option key={ c } data-testid={ c }>
                    {c}
                  </option>
                ))}
              </Forms.Control>
            </Forms.Label>
            <Forms.Label>
              Forma de Pagamento
              <Forms.Control
                as="select"
                className="method-input"
                data-testid="method-input"
                name="method"
                value={ method }
                onChange={ this.handleChange }
              >
                <option selected>Selecione o pagamento</option>
                {methodOptions.map((m) => (
                  <option key={ m } data-testid={ m }>
                    {m}
                  </option>
                ))}
              </Forms.Control>
            </Forms.Label>
            <Forms.Label>
              Categoria
              <Forms.Control
                as="select"
                className="tag-input"
                data-testid="tag-input"
                name="tag"
                value={ tag }
                onChange={ this.handleChange }
              >
                <option selected>Selecione a categoria da despesa</option>
                {tagOptions.map((t) => (
                  <option key={ t } data-testid={ t }>
                    {t}
                  </option>
                ))}
              </Forms.Control>
            </Forms.Label>
          </Forms.Group>
          <Button variant="success" type="button" onClick={ this.buttonClick }>
            Adicionar despesa
          </Button>
        </Forms.Group>
      </Forms>
    );
  }
}

Form.propTypes = {
  getCurrenciesDispatch: PropTypes.func.isRequired,
  buttonExpensesDispatch: PropTypes.func.isRequired,
  currenciesState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesDispatch: () => dispatch(getCurrencies()),
  buttonExpensesDispatch: (ex) => dispatch(buttonExpenses(ex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
