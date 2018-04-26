
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Modal from "./modal";
import Header from './Header';
import User from './User';
import Homepage from './Homepage';

import Product from './Product';

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
            <Route exact path="/" component={Homepage} />
            <Route exact path="/user" component={User} />
            <Route exact path="/results" component={Product} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
