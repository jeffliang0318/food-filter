import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class User extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      "soy":false,
      "fish":false,
      "fillet":false,
      "tuna":false,
      "salmon":false,
      "egg": false,
      "albumin":false,
      "globulin":false,
      "lecithin":false,
      "livetin":false,
      "lysozyme":false,
      "vitellin":false,
      "peanut": false,
      "arachis": false,
      "goobers": false,
      "lupin": false,
      "lupine": false,
      "milk": false,
      "cream":false,
      "whey": false,
      "casein": false,
      "caseinates": false,
      "cheese": false,
      "curds": false,
      "custard": false,
      "diacetyl": false,
      "ghee": false,
      "lactoferrin": false,
      "lactose": false,
      "crab": false,
      "lobster": false,
      "shrimp": false,
      "clams":false,
      "crawfish":false,
      "mussel":false,
      "oyster": false,
      "shellfish": ["crab", "lobster", "shrimp", "clams", "mussel", "crawfish", "oyster"],
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
      "wheat": false,
      "allwheat": ["wheat", "bran", "bulgur", "durum", "gluten", "kamut"]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount(){
    this.props.fetchUser().then(res => {
      let ings = res.allergyIngredient || [];
      for (var i = 0; i < ings.length; i++) {
        if (Object.keys(this.state).includes(ings[i])) {
          this.setState({[ings[i]]: true})
        }
      }

      let defaultList = this.defaultItems();

      let oIngCheckboxs = document.getElementsByName("ingcheckbox");
      for (let i = 0; i < oIngCheckboxs.length; i++) {
        if( defaultList.includes(oIngCheckboxs[i].id) ){
          oIngCheckboxs[i].checked = true;
          if(oIngCheckboxs[i].dataset.group) {
            let groupName = String(oIngCheckboxs[i].dataset.group);
            let gourpBool = true;
            let group = document.getElementById(groupName);
            let oMembers = document.querySelectorAll(`[data-group="${groupName}"]`);
            for (var j = 0; j < oMembers.length; j++) {
              if(oMembers[j].checked === false) gourpBool = false;
            }
            group.checked = gourpBool;
          }
        }
      }
    });
  }


  showUserList() {
    //from back end
    return this.props.auth.allergyIngredient.map(
      ing => (
          <li key={ing}><i className="far fa-dot-circle"></i>{ing}</li>
      )
    )
  }

  defaultItems() {
    let defaultList = Object.keys(this.state).filter(ing => {
      return this.state[ing] && (typeof this.state[ing] === 'boolean')
    });

    return defaultList
  }


  cantEatList() {
    let items = this.defaultItems();
    if(items.indexOf("milk") !== -1) {
      const milkStr = "milk(cream, whey, casein, caseinates, cheese, curds, custard, diacetyl, ghee, lactoferrin, lactose)";
      let indexMilk = items.indexOf("milk");
      items.splice(indexMilk, 12, milkStr);
    }
    if(items.indexOf("egg") !== -1) {
      const eggStr = "egg(albumin, globulin, lecithin, livetin, lysozyme, vitellin)";
      let indexEgg = items.indexOf("egg");
      items.splice(indexEgg, 7, eggStr);
    }
    if(items.indexOf("peanut") !== -1) {
      const peanutStr = "peanut(arachis, goobers, lupin, lupine)";
      let indexPeanut = items.indexOf("peanut");
      items.splice(indexPeanut, 5, peanutStr);
    }
    if(items.indexOf("fish") !== -1) {
      const fishStr = "fish(fillet, salmon, tuna)";
      let indexFish = items.indexOf("fish");
      items.splice(indexFish, 4, fishStr);
    }

    return items.join(", ");
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
    let eggRelated = ["albumin", "globulin", "lecithin", "livetin", "lysozyme", "vitellin"];
    let milkRelated = ["cream", "whey", "casein", "caseinates", "cheese", "curds", "custard", "diacetyl", "ghee", "lactoferrin", "lactose"];
    let peanutRelated = ["arachis", "goobers", "lupin", "lupine"];
    let fishRelated = ["fillet", "salmon", "tuna"];
    return e => {
      let boolean = this.state[e.target.id]
      this.setState({
        [e.target.id]: !boolean
      })
      if(e.target.id === "egg") {
        for (var i = 0; i < eggRelated.length; i++) {
          this.setState({
            [eggRelated[i]]: !boolean
          })
        }
      }
      if(e.target.id === "milk") {
        for (var j = 0; j < milkRelated.length; j++) {
          this.setState({
            [milkRelated[j]]: !boolean
          })
        }
      }
      if(e.target.id === "peanut") {
        for (var k = 0; k < peanutRelated.length; k++) {
          this.setState({
            [peanutRelated[k]]: !boolean
          })
        }
      }
      if(e.target.id === "fish") {
        for (var z = 0; z < fishRelated.length; z++) {
          this.setState({
            [fishRelated[z]]: !boolean
          })
        }
      }
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
        <h4>Update Allergy List</h4>
        <form className="ing-form clearfix">
          <div className="ing-group">
            <img alt="allergyIngredient" src="https://res.cloudinary.com/chengzii/image/upload/c_scale,w_200/v1524851914/peanut.png" />
            <div className="group-list">
              <div className="ing-item">
                <input
                  id="peanut"
                  type="checkbox"
                  name="ingcheckbox"
                  onChange={this.handleChange()}
                />
                <label htmlFor="peanut">peanut</label>
              </div>
            </div>
          </div>

          <div className="ing-group">
            <img alt="allergyIngredient" src="https://res.cloudinary.com/chengzii/image/upload/c_scale,w_200/v1524855355/egg.png" />
            <div className="group-list">
              <div className="ing-item">
                <input
                  id="egg"
                  type="checkbox"
                  name="ingcheckbox"
                  onChange={this.handleChange()}
                />
                <label htmlFor="egg">egg</label>
              </div>
            </div>
          </div>

          <div className="ing-group">
            <img alt="allergyIngredient" src="https://res.cloudinary.com/chengzii/image/upload/c_scale,w_200/v1524852058/milk.png" />
            <div className="group-list">
              <div className="ing-item">
                <input
                  id="milk"
                  type="checkbox"
                  name="ingcheckbox"
                  onChange={this.handleChange()}
                />
                <label htmlFor="milk">milk</label>
              </div>
            </div>
          </div>

          <div className="ing-group">
            <img alt="allergyIngredient" src="https://res.cloudinary.com/chengzii/image/upload/c_scale,w_200/v1524852185/soy.png" />
            <div className="group-list">
              <div className="ing-item">
                <input
                  id="soy"
                  type="checkbox"
                  name="ingcheckbox"
                  onChange={this.handleChange()}
                />
                <label htmlFor="soy">soy</label>
              </div>
            </div>
          </div>

          <div className="ing-group">
            <img alt="allergyIngredient" src="https://res.cloudinary.com/chengzii/image/upload/c_scale,w_200/v1524854828/fish.png" />
            <div className="group-list">
              <div className="ing-item">
                <input
                  id="fish"
                  type="checkbox"
                  name="ingcheckbox"
                  onChange={this.handleChange()}
                />
                <label htmlFor="fish">fish</label>
              </div>
            </div>
          </div>

          <div className="ing-group">
            <img alt="allergyIngredient" src="https://res.cloudinary.com/chengzii/image/upload/c_scale,w_200/v1524852142/wheat.png" />
            <div className="group-list">
              <div className="ing-item">
                <div className="group-header">
                  <input
                    id="allwheat"
                    type="checkbox"
                    name="ingcheckbox"
                    onChange={this.updteGroupCheckbox()}
                  />
                  <label htmlFor="allwheat">All Wheat</label>
                </div>
              </div>
              <div className="ing-item">
                <div>
                  <input
                    id="bran"
                    type="checkbox"
                    name="ingcheckbox"
                    data-group="allwheat"
                    onChange={this.updateGroupMemberCheck()}
                  />
                  <label htmlFor="bran">bran</label>
                </div>
              </div>
              <div className="ing-item">
                <div>
                  <input
                    id="bulgur"
                    type="checkbox"
                    name="ingcheckbox"
                    data-group="allwheat"
                    onChange={this.updateGroupMemberCheck()}
                  />
                  <label htmlFor="bulgur">bulgur</label>
                </div>
              </div>
              <div className="ing-item">
                <div>
                  <input
                    id="durum"
                    type="checkbox"
                    name="ingcheckbox"
                    data-group="allwheat"
                    onChange={this.updateGroupMemberCheck()}
                  />
                  <label htmlFor="durum">durum</label>
                </div>
              </div>
              <div className="ing-item">
                <div>
                  <input
                    id="gluten"
                    type="checkbox"
                    name="ingcheckbox"
                    data-group="allwheat"
                    onChange={this.updateGroupMemberCheck()}
                  />
                  <label htmlFor="gluten">gluten</label>
                </div>
              </div>
              <div className="ing-item">
                <div>
                  <input
                    id="kamut"
                    type="checkbox"
                    name="ingcheckbox"
                    data-group="allwheat"
                    onChange={this.updateGroupMemberCheck()}
                  />
                  <label htmlFor="kamut">kamut</label>
                </div>
              </div>
              <div className="ing-item">
                <div>
                  <input
                    id="wheat"
                    type="checkbox"
                    name="ingcheckbox"
                    data-group="allwheat"
                    onChange={this.updateGroupMemberCheck()}
                  />
                  <label htmlFor="wheat">wheat</label>
                </div>
              </div>
            </div>
          </div>

          <div className="ing-group">
            <img alt="allergyIngredient" src="https://res.cloudinary.com/chengzii/image/upload/c_scale,w_200/v1524851999/treenuts.png" />
            <div className="group-list">
              <div className="ing-item">
                <div className="group-header">
                  <input
                    id="treenuts"
                    type="checkbox"
                    name="ingcheckbox"
                    onChange={this.updteGroupCheckbox()}
                  />
                  <label htmlFor="treenuts">All Treenuts</label>
                </div>
              </div>
              <div className="ing-item">
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
              <div className="ing-item">
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
              <div className="ing-item">
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
              <div className="ing-item">
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
              <div className="ing-item">
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
              <div className="ing-item">
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
            </div>
          </div>

          <div className="ing-group">
            <img alt="allergyIngredient" src="https://res.cloudinary.com/chengzii/image/upload/c_scale,w_200/v1524852222/shellfish.png" />
            <div className="group-list">
              <div className="ing-item">
                <div className="group-header">
                  <input
                    id="shellfish"
                    type="checkbox"
                    name="ingcheckbox"
                    onChange={this.updteGroupCheckbox()}
                  />
                  <label htmlFor="shellfish">All Shellfish</label>
                </div>
              </div>
              <div className="ing-item">
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
              <div className="ing-item">
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
              <div className="ing-item">
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
              <div className="ing-item">
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
              <div className="ing-item">
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
              <div className="ing-item">
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
              <div className="ing-item">
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
            </div>
          </div>
        </form>

        <div className="editShow">
          <h4>
            Review Changes Before Submit
          </h4>

          <p>{this.cantEatList()}</p>
          <h4>
            <div className="update-clear">
              <button
                className="update-button"
                onClick={this.handleClear}>
                Clear All
              </button>
              <button
                className="update-button"
                onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </h4>
        </div>
      </div>
    );
  }

  handleClear() {
    let oAllCheckboxes = document.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < oAllCheckboxes.length; i++) {
      oAllCheckboxes[i].checked = false;
    }
    let keys = Object.keys(this.state);
    for (var i = 0; i < keys.length; i++) {
      if(typeof this.state[keys[i]] === "boolean") {
        this.setState({
          [keys[i]]:false
        })
      }
    }
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
          <div className="userProfileList">
            <h1 className="username">Hi, {this.props.auth.preferredName}</h1>
            <div>
              <h4>Your Allergy List</h4>
              <ul className="userList-ul clearfix">
              {this.showUserList()}
              </ul>
            </div>
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
