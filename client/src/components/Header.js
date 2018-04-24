import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../actions/modal_actions';



class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1">
            <a href="/auth/google">Login With Google</a>
          </li>,
          <li key="2">
            <a href="/">DEMO jeff</a>
          </li>,
          <li key='nav-3'>
            <button onClick={() => this.props.openModal('login')}> openModal </button>
          </li>
        ];
      default:
        return [
          <li key="1">
            <a href="/user">User</a>
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/' : '/auth/google'}
            className="left brand-logo">
            FoodFilter
          </Link>
          <ul className="right">{this.renderContent()}</ul>
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
