import React, { Component } from 'react';
import './App.css';
import { getOrders, makeNewOrder, deleteOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => {
        this.setState({orders: data.orders})
      })
      .catch(err => console.error('Error fetching:', err));
  }

  submitNewOrder = (name, ingredients) => {
    makeNewOrder(name, ingredients)
      .then(data => this.setState({orders: [...this.state.orders, data]}))
      .catch(err => console.error('Error posting:', err))
  }

  removeOrder = (id) => {
    deleteOrder(id)
    .then(() => {
      const remainingOrders = this.state.orders.filter(order => order.id !== id)
      this.setState({orders: remainingOrders})
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm submitNewOrder={this.submitNewOrder}/>
        </header>

        <Orders orders={this.state.orders} removeOrder={this.removeOrder}/>
      </main>
    );
  }
}


export default App;