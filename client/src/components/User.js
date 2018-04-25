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
    this.props.updateAllergyIngredient(this.state.ingredient);
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <h3 key={1}>
            Please Login for more features
          </h3>,
          <a key={2} className="button-group" href="/">Back to Homepage</a>
        ];
      default:
      const foodItems = this.state.ingredient.map(
        ing => {
          return (
            <li key={ing}>{ing}</li>
          )
        }
      )
        return (
          <div>
            <h1>Username</h1>
            <hr />
            <div>
              <h4>Allgey List. From Backend Database</h4>
              <ul>
                <li>Eggs</li>
                <li>Eggs</li>
                <li>Eggs</li>
              </ul>
            </div>
            <hr />

            <button
              className="submit-ingredient-button"
              onClick={ () => this.setState({ingredient: this.state.ingredient.concat(["peanut"])})}
            >
              I cant eat peanut!
            </button>
            <br/>
            <button
              className="submit-ingredient-button"
              onClick={ () => this.setState({ingredient: this.state.ingredient.concat(["egg"])})}
            >
              I cant eat egg!
            </button>
            <h2>My allergy ingredient: {foodItems}</h2>
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
      <div className="user-profile">
      {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}


export default connect(mapStateToProps, actions)(User);
