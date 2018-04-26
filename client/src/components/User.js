import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class User extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: [],
      // redmeat: [],
      // milk: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchUser();
    // this.setState({ingredient: this.props.auth.allergyIngredient})
    // let savedInfo = this.props.auth.allergyIngredient;
    // console.log(savedInfo)
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.updateAllergyIngredient(this.state.ingredient);
  }

  handleChange(e) {
    return e => {
      if(e.target.checked) {
        // console.log(e.target);
        if (e.target.id === "egg") {
          this.setState({
            ingredient: this.state.ingredient.concat(["egg", "liveyin"])
          })
        } else {
          this.setState({
            ingredient: this.state.ingredient.concat([e.target.id])
          })
        }
        // console.log(this.state)
      } else {
        let index = this.state.ingredient.indexOf(e.target.id);
        let updatedIngredient = this.state.ingredient;
        if (e.target.id === "egg"){
          updatedIngredient.splice(index, 2);
        } else {
          updatedIngredient.splice(index, 1);
        }
        this.setState({
          ingredient: updatedIngredient
        })
      }

      // this.handleCheckbox(e.target);
    }
  }

  checkRedmeat() {
    return e => {
      let lamb = document.getElementById("lamb");
      let beef = document.getElementById("beef");
      if(e.target.checked) {
        // console.log(e)
        // console.log(lamb.checked)
        // console.log(beef.checked)

        if(!lamb.checked) {
          lamb.checked = true;
          this.handleCheckbox(lamb);
        }
        if(!beef.checked) {
          beef.checked = true;
          this.handleCheckbox(beef);
        }
      } else {
        lamb.checked = false;
        beef.checked = false;
        this.handleCheckbox(beef);
        this.handleCheckbox(lamb);

      }
    }
  }

  // handleCheckbox(el) {
  //   if(el.checked) {
  //     console.log(this.state.ingredient)
  //     this.setState({
  //       ingredient: this.state.ingredient.concat([el.id])
  //     })
  //     console.log(this.state.ingredient)
  //   } else {
  //     let index = this.state.ingredient.indexOf(el.id);
  //     let updatedIngredient = this.state.ingredient;
  //     updatedIngredient.splice(index, 1);
  //     this.setState({
  //       ingredient: updatedIngredient
  //     })
  //   }
  // }

  renderErrors() {
    return(
      <ul className="error-ul">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
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
      const updatedList = this.state.ingredient.map(
        ing => {
          return (
            <li key={ing}>{ing}</li>
          )
        }
      )
      return (
        <div>
          <h1>Hi, {this.props.auth.name}</h1>
          <hr />
          <div>
            <h4>Your Allgey List</h4>
            <ul>
            {foodItems}
            </ul>
          </div>
          <hr />

          <div>
            <h4>Need Update?</h4>
            <form>
              <div className="ing-group">
                <div>
                  <input
                    id="beef"
                    type="checkbox"
                    onChange={this.handleChange()}
                  />
                  <label htmlFor="beef">beef</label>
                </div>
              </div>

              <div className="ing-group">
                <div>
                  <input
                    id="lamb"
                    type="checkbox"
                    onChange={this.handleChange()}
                  />
                  <label htmlFor="lamb">lamb</label>
                </div>
              </div>

              <br />

              <div>
                <input
                  id="peanut"
                  type="checkbox"
                  onChange={this.handleChange()}
                />
                <label htmlFor="peanut">peanut</label>
              </div>

              <div>
                <input
                  id="egg"
                  type="checkbox"

                  onChange={this.handleChange()}
                />
                <label htmlFor="egg">egg</label>
              </div>

              <div>
                <input
                  id="milk"
                  type="checkbox"
                  onChange={this.handleChange()}
                />
                <label htmlFor="milk">milk</label>
              </div>

            </form>

            <h2>I cant eat these: {updatedList}</h2>
            <button
              className="submit-ingredient-button"
              onClick={this.handleSubmit}
            >
              Update My Allergy Ingredient
            </button>
          </div>
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
