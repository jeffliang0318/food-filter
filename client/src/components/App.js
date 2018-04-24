import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Modal from "./modal";

import Header from "./Header";
import User from "./User";

const Landing = () => <h2>FoodFilter, Can I eat this? (;</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Modal /> 
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/user" component={User} />
            <input type='checkbox' />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
