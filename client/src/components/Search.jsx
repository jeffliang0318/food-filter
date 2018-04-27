import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { fetch_product } from '../actions/searchResults';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToUpload = this.redirectToUpload.bind(this);
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

  redirectToUpload(e) {
    e.preventDefault();
    this.props.history.push("/searchupload");
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
          <Link to='/searchupload'><i className="fas fa-camera"></i></Link>
        </form>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  fetch_product: (searchTerms) =>
    dispatch(fetch_product(searchTerms)),
});

export default withRouter(connect(null, mapDispatchToProps)(Search));
