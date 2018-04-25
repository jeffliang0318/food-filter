import { combineReducers } from 'redux';
import authReducer from './authReducer';
import searchResultsReducer from './searchResultsReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  searchResults: searchResultsReducer,
  errors: errorReducer
});
