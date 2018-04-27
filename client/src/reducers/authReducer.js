import { FETCH_USER } from '../actions/index';
// import { FETCH_USER } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      console.log(action.payload);
      return action.payload || false;
    default:
    return state;
  }
}
