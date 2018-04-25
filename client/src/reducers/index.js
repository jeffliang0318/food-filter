import { combineReducers } from 'redux';
import authReducer from './authReducer';
import searchResultsReducer from './searchResultsReducer';

export default combineReducers({
  auth: authReducer,
  searchResults: searchResultsReducer
});
