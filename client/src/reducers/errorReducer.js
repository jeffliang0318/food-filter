import {
  FETCH_ERROR
} from '../actions/searchResults';


export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ERROR:
      return [action.errors];
    default:
      return state;
  }
}
