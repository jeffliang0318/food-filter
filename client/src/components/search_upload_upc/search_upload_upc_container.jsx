import { connect } from "react-redux";
import searchUploadUPC from "./search_upload_upc";
import { fetch_product } from '../../actions/searchResults';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetch_product: (searchTerms) =>
    dispatch(fetch_product(searchTerms)),
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(searchUploadUPC));
