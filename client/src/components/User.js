import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class User extends  Component {
  constructor(props) {
    super(props);
    this.state = { ingredient: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    const user = this.props.fetchUser();
    // this.setState({ingredient: this.props.auth.allergyIngredient})
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
      //from back end
      const foodItems = this.props.auth.allergyIngredient.map(
        ing => {
          return (
            <li key={ing}>{ing}</li>
          )
        }
      )
      //onchange update
      const update = this.state.ingredient.map(
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
              {foodItems}
              </ul>
            </div>
            <hr />

            <button
              className="submit-ingredient-button"
              onClick={ () => this.setState({ingredient: this.state.ingredient.concat(["peanut"])})}
            >
              I cant eat peanut!
            </button>
            <button
              className="submit-ingredient-button"
              onClick={ () => this.setState({ingredient: []})}
            >
              I can eat peanut!
            </button>
            <br/>
            <button
              className="submit-ingredient-button"
              onClick={ () => this.setState({ingredient: this.state.ingredient.concat(["egg"])})}
            >
              I cant eat egg!
            </button>
            <button
              className="submit-ingredient-button"
              onClick={ () => this.setState({ingredient: []})}
            >
              I can eat egg!
            </button>
            <h2>I cant eat these: {update}</h2>
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
