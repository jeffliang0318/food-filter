import { FETCH_USER } from '../actions/index';
import { LOGIN_USER, REGISTER_USER } from '../actions/session_actions';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload  || false;
    default:
    case LOGIN_USER: 
      return action.payload || false;
    case REGISTER_USER:
      return action.payload || false;
    return state;
  }
}
