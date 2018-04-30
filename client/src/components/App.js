
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Modal from "./modal";
import Header from './Header';
import Footer from './Footer';
import User from './User';
import Team from './Team';
import Homepage from './Homepage';
import SearchUpload from './search_upload_upc/search_upload_upc_container';
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
            <Route exact path="/team" component={Team} />
            <Route exact path="/results" component={Product} />
            <Route exact path='/searchupload' component={SearchUpload} />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
