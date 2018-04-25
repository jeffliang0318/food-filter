import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../actions/modal_actions';

import Search from './Search';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1" className="button-group">
            <button onClick={() => this.props.openModal('login')}> Login </button>
          </li>,
          <li key="2" className="button-group">
            <a href="/">Demo</a>
          </li>,
        ];
      default:
        return [
          <a key="1"  href="/user" className="button-group">User</a>,
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
            <ul className="header-right-auth">{this.renderContent()}</ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
