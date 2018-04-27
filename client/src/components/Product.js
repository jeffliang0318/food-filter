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
      str = this.removeColon(ing);
    } else {
      str = ing;
      str = str.replace('.', '');
      str = str.replace('[', '');
      str = str.replace(']', '');
      str = str.replace('(', '');
      str = str.replace(')', '');
      str = str.replace('INCLUDING', '');
      //delete 2 spaces
      str = str.replace(/\s\s+/g, ' ');
    }
    let singleIngArr = str.split(', ');
    ingrendients = ingrendients.concat(singleIngArr);

    return (
      <ul className="ing-ul">
        {ingrendients.map((ing, idx) => <li key={`ing-${idx}`}>{ing}</li>)}
      </ul>
    );
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
    let ingArr = ing.split('.');
    let str;
    for (var i = 0; i < ingArr.length; i++) {
      let index = ingArr[i].indexOf(':');
      if (index > 0) {
        str = ingArr[i].slice(index + 2, ingArr[i].length);
        str = str.replace('[', '');
        str = str.replace(']', '');
        str = str.replace('(', '');
        str = str.replace(')', '');
        str = str.replace('INCLUDING', '');
        //delete 2 spaces
        str = str.replace(/\s\s+/g, ' ');
      }
    }
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
  errors: state.errors
});

export default connect(mapStateToProps, null)(Product);
