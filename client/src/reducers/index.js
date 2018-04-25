import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ui from './ui_reducer';
import searchResultsReducer from './searchResultsReducer';

export default combineReducers({
  auth: authReducer,
  ui: ui,
  searchResults: searchResultsReducer
});
