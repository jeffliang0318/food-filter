import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class User extends  Component {
  constructor(props) {
    super(props);
    this.state = { ingredient: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.updateAllergyIngredient(this.state.ingredient)
    .then(console.log("submit"));
  }
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
          <div>
            <h1>I cant eat this ):</h1>
            <button
              className="submit-ingredient-button"
              onClick={ () => this.setState({ ingredient: ["peanut"] })}
            >
              I cant eat peanut!
            </button>
            <h2>My allergy ingredient: {this.state.ingredient}</h2>
            <button
              className="submit-ingredient-button"
              onClick={this.handleSubmit}
            >
              Update My Allergy Ingredient
            </button>
          </div>

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


export default connect(mapStateToProps, actions)(User);
