import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../actions/modal_actions';
import { loginUser, registerUser } from '../actions/session_actions';
import { withRouter } from "react-router-dom";

import Search from './Search';


class Header extends Component {
  constructor(props) {
    super(props);

    this.handleDemoLogin =   this.handleDemoLogin.bind(this);
  }

  handleDemoLogin() {
    this.props.loginUser({username:'Demo', password:'password'});

    clearTimeout(this.timer);
    const that = this;
    this.timer = setTimeout(function() {
      that.props.history.push("/user");
    }, 600)
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <a key="1" className="button-group" onClick={() => this.props.openModal('login')}> Login </a>,
          <a key="2" className="button-group" onClick = { this.handleDemoLogin}>Demo</a>,
        ];
      default:
        return [
          <a key="1" href="/user" className="button-group">My Profile</a>,
          <a key="2" className="button-group" href="/api/logout">Logout</a>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to="/"
            className="header-left brand-logo">
            FoodFilter
          </Link>
          <div className="header-right">
            <Search />
            <div className="header-right-auth">{this.renderContent()}</div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {auth: state.auth };
}

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  registerUser:(user) => dispatch(registerUser(user)),
  loginUser:(user) => dispatch(loginUser(user))

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
