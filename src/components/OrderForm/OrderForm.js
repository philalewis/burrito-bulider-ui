import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.submitNewOrder(this.state.name, this.state.ingredients)
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleIngredientChange = event => {
    event.preventDefault()
    if (this.state.ingredients.filter(ing => ing === event.target.name).length < 2) {
      this.setState({ingredients: [...this.state.ingredients, event.target.name]})
    }
  }

  handleNameChange = event => {
    this.setState({name: event.target.value})
  }

  checkIfDisabled = () => {
    return (this.state.name.length === 0 || this.state.ingredients.length === 0)
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapeno', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient + this.state.ingredients.length} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p className='ingredients-list'>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)} disabled={this.checkIfDisabled()}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
