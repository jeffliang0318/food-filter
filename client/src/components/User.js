import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class User extends  Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1"><h1>Please Login for more features</h1></li>,
          <li key='2'><a href="/">Back to Homepage</a></li>,
        ];
      default:
        return (
            <h1>I cant eat these ):</h1>
        )
    }
  }

  render() {
    return (
      <div>
      {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(User);
