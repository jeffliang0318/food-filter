import { FETCH_PRODUCT } from '../actions/searchResults';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.searchResults;
    default:
      return state;
  }
}
