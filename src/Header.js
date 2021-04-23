import React from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import PizzaForm from "./PizzaForm";
import "./App.css";
import styled from 'styled-components';


function PizzaHead() {
  return (<Router>
    <div className="nav-links">
      <div className="navBar">
      <div className="link1">
        <h1>Ciao Pizza!</h1>
       <Link to="/">Home</Link>
      </div>
      <div className="link2">
        <Link to="/Form">Place Order</Link>
        
        <Route path="/Form">
        <PizzaForm/>
      </Route>
     </div> 
     </div>
   </div>
   </Router>
   );}

  

export default PizzaHead