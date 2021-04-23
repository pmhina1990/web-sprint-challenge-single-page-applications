import React from 'react'
function PizzaCheckout(props) {
const {newOrder} = props
 return (
  <div>
    <h2>Thank You for your order from Ciao Pizza</h2>
    <p>Name: {newOrder.name}</p>
    <p>Email: {newOrder.email}</p>
    <p>Phone: {newOrder.phone}</p>
    <p>Size: {newOrder.size}</p>
    <p>Additional Information: {newOrder.textarea}</p>
    <button>Track your Order</button>
</div>

)}
export default PizzaCheckout