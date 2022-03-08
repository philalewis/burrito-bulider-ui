import React from 'react';
import './Orders.css';

const Orders = ({ orders, removeOrder }) => {
  const getPrices = (ingredients) => {
    const prices = {
      beans: 1,
      steak: 3,
      carnitas: 3,
      sofritas: 3,
      lettuce: 1,
      'queso fresco': 2,
      'pico de gallo': 1,
      'hot sauce': 1,
      guacamole: 3,
      jalapeno: 1,
      cilantro: 1,
      'sour cream': 2
    }
    return ingredients.reduce((acc, ing) => {
      acc += prices[ing]
      console.log(acc)
      return acc
    }, 0)
  }

  const orderEls = orders.map(order => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={ingredient}>{ingredient}</li>
          })}
        </ul>
        <p>${getPrices(order.ingredients)}</p>
        <button className='remove' onClick={() => removeOrder(order.id)}>REMOVE</button>
      </div>
    )
  });


  

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;