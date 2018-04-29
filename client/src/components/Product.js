import React, { Component } from 'react';
import { connect } from 'react-redux';

class Product extends Component {

  ingredientsChecker() {
    if(!this.props.searchResults.ing) {
      return (
        <ul className="ing-ul">
          <li key={`ing-000`} style={{color:"red"}}>
            NDSA Database does not have ingredient for this product.
          </li>
        </ul>)
    }
    const ing = this.props.searchResults.ing.desc;

    let ingrendients = [];
    let str;
    if (ing.includes(':')) {
      str = ing.split(":").join(" ");
    }
    str = this.removeColon(ing);

    let singleIngArr = str.split(', ');
    singleIngArr = singleIngArr.filter(el => el !== "");
    singleIngArr = singleIngArr.filter(el => el !== ".");
    ingrendients = ingrendients.concat(singleIngArr);

    let userList = this.props.auth.allergyIngredient;
    return (
      <ul className="ing-ul">
        {ingrendients.map((ing, idx) =>
           (userList && this.checkInclude(ing, userList)) ?
            <li className="hightlight" key={`ing-${idx}`}>{ing}</li>
            : <li key={`ing-${idx}`}>{ing}</li>
        )}
      </ul>
    );
  }

  checkInclude(ing, userList) {
    for (var i = 0; i < userList.length; i++) {
      if(ing.toLowerCase().includes("soymilk") && userList[i] === "milk") {continue};
      if(ing.toLowerCase().includes("almondmilk") && userList[i] === "milk") {continue};
      if(ing.toLowerCase().includes(userList[i])) return true;
    }
    return false;
  }

  nutrientsChecker() {
    const nutrients = this.props.searchResults.nutrients;

    return (
      <ul className="ing-ul">
        {nutrients.map((nutrient, idx) => (
          <li key={`nutrient-${idx}`}>
            {nutrient.name} {nutrient.value}
            {nutrient.unit}
          </li>
        ))}
      </ul>
    );
  }

  removeColon(ing) {
    let str = ing.split(".").join(" ");
    // str = ing.split(":").join(" ");
    // str = ing.split(",").join(" ");
    // str = str.replace(',', ' ');
    // str = str.replace('[', '');
    // str = str.replace(']', '');
    // str = str.replace('(', '');
    // str = str.replace(')', '');
    // str = str.replace(/[\[\]']+/g, ' ');
    // str = str.replace(/[()]/g, ' ');
    str = str.replace(/[()]/g, ', ');
    str = str.replace('INCLUDING', '');
    //delete 2 spaces
    str = str.replace(/\s\s+/g, ' ');
    return str;
  }

  renderErrors() {
    return (
      <ul className="error-ul">
        {this.props.errors.map((error, idx) => (
          <li key={`error-${idx}`}>{error}</li>
        ))}
      </ul>
    );
  }

  render() {
    if (!this.props.searchResults) {
      return (
        <div className="ingredientList">
          <h2>Nothing Found. Please Try again!</h2>
          <div className="error-ul">{this.renderErrors()}</div>
        </div>
      );
    }
    let searchResults = this.props.searchResults;
    return (
      <div className="ingredientList">
        <h2>{searchResults.name}</h2>
        <div className="product-detail">
          <h5>Ingrendients</h5>
          {this.ingredientsChecker()}
        </div>
        <div className="product-detail">
          <h5>Nutrient</h5>
          {this.nutrientsChecker()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults,
  errors: state.errors,
  auth: state.auth
});


export default connect(mapStateToProps, null)(Product);
