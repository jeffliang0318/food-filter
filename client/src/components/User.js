import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class User extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      "egg": false,
      "lysozyme":false,
      "peanut": false,
      "milk": false,
      "crab": false,
      "lobster": false,
      "shrimp": false,
      "clams":false,
      "crawfish":false,
      "mussel":false,
      "oyster": false,
      "shellfish": ["crab", "lobster", "shrimp", "clams", "mussel", "oyster"],
      "almond": false,
      "cashew": false,
      "chestnut": false,
      "hazelnut": false,
      "pistachio": false,
      "walnut": false,
      "treenuts": ["almond", "cashew", "chestnut", "hazelnut", "pistachio", "walnut"],
      "bran": false,
      "bulgur": false,
      "durum": false,
      "gluten": false,
      "kamut": false,
      "wheat": ["bran", "bulgur", "durum", "gluten", "kamut"]
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

      // let defaultList = Object.keys(this.state).filter(ing => {
      //   return this.state[ing] && (typeof this.state[ing] === 'boolean')
      // });
      let defaultList = this.defaultItems();

      let oIngCheckboxs = document.getElementsByName("ingcheckbox");
      for (let i = 0; i < oIngCheckboxs.length; i++) {
        if( defaultList.includes(oIngCheckboxs[i].id) ){
          oIngCheckboxs[i].checked = true;
          let groupName = String(oIngCheckboxs[i].dataset.group);
          let gourpBool = true;

          let group = document.getElementById(groupName);
          let oMembers = document.querySelectorAll(`[data-group="${group.id}"]`);
          for (var j = 0; j < oMembers.length; j++) {
            // console.log(oMembers[i].checked)
            if(oMembers[j].checked === false) gourpBool = false;
          }
          group.checked = gourpBool;
        }
      }
    });
  }
  //
  // checkedDefault() {
  //   let defaultList = this.props.auth.allergyIngredient;
  //   let oIngCheckboxs = document.getElementsByName("ingcheckbox");
  //   for (let i = 0; i < oIngCheckboxs.length; i++) {
  //     if(defaultList.includes(oIngCheckboxs[i].id) ){
  //       oIngCheckboxs[i].checked = true;
  //
  //       let group = document.getElementById(oIngCheckboxs[i].dataset.group);
  //       console.log(group)
  //       let gourpBool = true;
  //
  //       let oMembers = document.querySelectorAll(`[data-group="${group.id}"]`);
  //       for (var i = 0; i < oMembers.length; i++) {
  //         if(oMembers[i].checked === false) gourpBool = false;
  //       }
  //       group.checked = gourpBool;
  //     }
  //   }
  // }

  showUserList() {
    //from back end
    return this.props.auth.allergyIngredient.map(
      ing => (
          <li key={ing}>{ing}</li>
      )
    )
  }

  defaultItems() {
    let defaultList = Object.keys(this.state).filter(ing => {
      return this.state[ing] && (typeof this.state[ing] === 'boolean')
    });

    return defaultList
  }

  handleSubmit(e) {
    e.preventDefault();
    let valideItems =  Object.keys(this.state).filter(ing => {
      // if(ing === "egg")
      return this.state[ing] && (typeof this.state[ing] === 'boolean')
    });
    this.props.updateAllergyIngredient(valideItems);
  }

  handleChange(e) {
    return e => {
      let boolean = this.state[e.target.id]
      this.setState({
        [e.target.id]: !boolean
      })
    }
  }

  updateGroupMemberCheck(e) {
    return e => {
      let boolean = this.state[e.target.id]
      this.setState({
        [e.target.id]: !boolean,
      })
      let group = document.getElementById(e.target.dataset.group);
      let gourpBool = true;
      if(!boolean === false) {
        gourpBool = false;
      } else {
        let oMembers = document.querySelectorAll(`[data-group="${group.id}"]`);
        for (var i = 0; i < oMembers.length; i++) {
          if(oMembers[i].checked === false) gourpBool = false;
        }
      }
      group.checked = gourpBool;
    }
  }

  updteGroupCheckbox(e){
    return e => {
      if(e.target.checked) {
        //group checkRedmeat
        let group = this.state[e.target.id]
        for (let i = 0; i < group.length; i++) {
          let oItem = document.getElementById(group[i]);
          oItem.checked = true;
          this.setState({
            [group[i]] : true
          })
        }
      } else {
        //group remove checked
        let group = this.state[e.target.id]
        for (let i = 0; i < group.length; i++) {
          let oItem = document.getElementById(group[i]);
          oItem.checked = false;
          this.setState({
            [group[i]] : false
          })
        }
      }
    }
  }

  updateUserList() {
    return (
      <div>
        <h4>Need Update?</h4>
        <form>
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

          <br />

          <div className="ing-group">
            <div>
              <input
                id="wheat"
                type="checkbox"
                name="ingcheckbox"
                onChange={this.updteGroupCheckbox()}
              />
              <label htmlFor="treenuts">Wheat Allgey</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="bran"
                type="checkbox"
                name="ingcheckbox"
                data-group="wheat"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="bran">bran</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="bulgur"
                type="checkbox"
                name="ingcheckbox"
                data-group="wheat"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="bulgur">bulgur</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="durum"
                type="checkbox"
                name="ingcheckbox"
                data-group="wheat"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="durum">durum</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="gluten"
                type="checkbox"
                name="ingcheckbox"
                data-group="wheat"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="gluten">gluten</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="kamut"
                type="checkbox"
                name="ingcheckbox"
                data-group="wheat"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="kamut">kamut</label>
            </div>
          </div>
          <br />


          <div className="ing-group">
            <div>
              <input
                id="wheat"
                type="checkbox"
                name="ingcheckbox"
                onChange={this.updteGroupCheckbox()}
              />
              <label htmlFor="treenuts">Treenuts Allergy</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="almond"
                type="checkbox"
                name="ingcheckbox"
                data-group="treenuts"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="almond">almond</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="cashew"
                type="checkbox"
                name="ingcheckbox"
                data-group="treenuts"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="cashew">cashew</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="chestnut"
                type="checkbox"
                name="ingcheckbox"
                data-group="treenuts"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="chestnut">chestnut</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="hazelnut"
                type="checkbox"
                name="ingcheckbox"
                data-group="treenuts"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="hazelnut">hazelnut</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="pistachio"
                type="checkbox"
                name="ingcheckbox"
                data-group="treenuts"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="pistachio">pistachio</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="walnut"
                type="checkbox"
                name="ingcheckbox"
                data-group="treenuts"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="walnut">walnut</label>
            </div>
          </div>
          <br />


          <div className="ing-group">
            <div>
              <input
                id="shellfish"
                type="checkbox"
                name="ingcheckbox"
                onChange={this.updteGroupCheckbox()}
              />
              <label htmlFor="shellfish">Shellfish Allergy</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="crab"
                type="checkbox"
                name="ingcheckbox"
                data-group="shellfish"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="crab">crab</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="shrimp"
                type="checkbox"
                name="ingcheckbox"
                data-group="shellfish"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="shrimp">shrimp</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="lobster"
                type="checkbox"
                name="ingcheckbox"
                data-group="shellfish"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="lobster">lobster</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="clams"
                type="checkbox"
                name="ingcheckbox"
                data-group="shellfish"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="clams">clams</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="crawfish"
                type="checkbox"
                name="ingcheckbox"
                data-group="shellfish"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="crawfish">crawfish</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="mussel"
                type="checkbox"
                name="ingcheckbox"
                data-group="shellfish"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="mussel">mussel</label>
            </div>
          </div>
          <div className="ing-group">
            <div>
              <input
                id="oyster"
                type="checkbox"
                name="ingcheckbox"
                data-group="shellfish"
                onChange={this.updateGroupMemberCheck()}
              />
              <label htmlFor="oyster">oyster</label>
            </div>
          </div>
          <br />


        </form>
        <br />

        <h2>I cant eat these: {this.defaultItems().join(", ")}</h2>
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
              {this.showUserList()}
              </ul>
            </div>
            <hr />

            {this.updateUserList()}
          </div>
        )
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
