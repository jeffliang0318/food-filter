import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class User extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      "egg": false,
      "beef": false,
      "lamb": false,
      "milk": false,
      // "redmeat": ["beef", "lamb"]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchUser().then(res => {
      let ings = res.allergyIngredient;
      for (var i = 0; i < ings.length; i++) {
        if (Object.keys(this.state).includes(ings[i])) {
          this.setState({[ings[i]]: true})
        }
      }

      let defaultList = Object.keys(this.state).filter(ing=> this.state[ing]);

      let oIngCheckboxs = document.getElementsByName("ingcheckbox");
      for (let i = 0; i < oIngCheckboxs.length; i++) {
        console.log(oIngCheckboxs[i].id)
        if( defaultList.includes(oIngCheckboxs[i].id) ){
          oIngCheckboxs[i].checked = true;
        }
      }
    });


  }
  handleSubmit(e) {
    e.preventDefault();
    let ingsArr = Object.keys(this.state);
    let valideItems = ingsArr.filter(ing => this.state[ing])
    this.props.updateAllergyIngredient(valideItems);
  }

  handleChange() {
    return e => {
      let boolean = this.state[e.target.id]
      this.setState({
        [e.target.id]: !boolean
      })
    }
  }


  checkedDefault() {
    let defaultList = this.props.auth.allergyIngredient;
    let oIngCheckboxs = document.getElementsByName("ingcheckbox");
    for (let i = 0; i < oIngCheckboxs.length; i++) {
      console.log(oIngCheckboxs.id)
      if( defaultList.includes(oIngCheckboxs.id) ){
        oIngCheckboxs[i].checked = true;
      }
    }
  }

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

  showUserList() {

    //from back end
    return this.props.auth.allergyIngredient.map(
      ing => (
          <li key={ing}>{ing}</li>
      )
    )
  }

  updateUserList() {
    return (
      <div>
        <h4>Need Update?</h4>
        <form>
          <div className="ing-group">
            <div>
              <input
                id="beef"
                type="checkbox"
                name="ingcheckbox"
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
                name="ingcheckbox"
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
              name="ingcheckbox"
              onChange={this.handleChange()}
            />
            <label htmlFor="peanut">peanut</label>
          </div>

          <div>
            <input
              id="egg"
              type="checkbox"
              name="ingcheckbox"
              onChange={this.handleChange()}
            />
            <label htmlFor="egg">egg</label>
          </div>

          <div>
            <input
              id="milk"
              type="checkbox"
              name="ingcheckbox"
              onChange={this.handleChange()}
            />
            <label htmlFor="milk">milk</label>
          </div>

        </form>

        <h2>I cant eat these: {}</h2>
        <button
          className="submit-ingredient-button"
          onClick={this.handleSubmit}
        >
          Update My Allergy Ingredient
        </button>
      </div>
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

        return (
          <div>
            <h1>Username</h1>
            <hr />
            <div>
              <h4>Your Allgey List</h4>
              <ul>
              {
                this.showUserList()
              }
              </ul>
            </div>
            <hr />

            {this.updateUserList()}
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
