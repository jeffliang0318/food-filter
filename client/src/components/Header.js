import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../actions/modal_actions';
import { loginUser, registerUser } from '../actions/session_actions';

import Search from './Search';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <a key="1" className="button-group" onClick={() => this.props.openModal('login')}> Login </a>,
          <a key="2" className="button-group" onClick = {
              () => this.props.loginUser({username:'Demo', password:'password'})}

            >Demo</a>,
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
