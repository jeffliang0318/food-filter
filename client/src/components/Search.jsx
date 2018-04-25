import React, { Component } from 'react';
import { connect } from 'react-redux';

class Search extends Component {

  render() {
    return (
      <div className="search-form-container">
        <form className="search-form">
          <input placeholder="Search UPC"/>
        </form>
      </div>
    );
  }
}


export default connect(null, null)(Search);
