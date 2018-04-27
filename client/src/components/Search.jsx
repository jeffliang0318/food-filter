import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetch_product } from '../actions/searchResults';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let searchTerm = this.state.searchTerm;
    this.props.fetch_product(searchTerm)
      .then(() =>
        this.setState({
          searchTerm: ''
        })
      ).then(() => this.props.history.push("/results"));

  }

  render() {
    return (
        <form className="search-form">
          <input
            value = {this.state.searchTerm}
            placeholder="Search UPC"
            onChange={this.update('searchTerm')}
          />
          <input className="submit" type="submit" onClick={this.handleSubmit} />
          <a className="camera" href="/searchupload"><i className="fas fa-camera"></i></a>
        </form>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  fetch_product: (searchTerms) =>
    dispatch(fetch_product(searchTerms)),
});

export default withRouter(connect(null, mapDispatchToProps)(Search));
