import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



class Search extends Component {

  render() {
    return (
      <form>
        <input placeholder="Search here"/>
      </form>
    );
  }
}


export default connect(null, null)(Search);
