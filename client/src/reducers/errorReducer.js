import {
  FETCH_ERROR
} from '../actions/searchResults';

import {FETCH_AUTH_ERRORS } from '../actions/session_actions';

export default function(state = [], action) {
  // console.log(action.errors);
  switch (action.type) {
    case FETCH_ERROR:
      return [action.errors];
    case FETCH_AUTH_ERRORS:
      return action.errors ||[];
    default:
      return state;
  }
}
