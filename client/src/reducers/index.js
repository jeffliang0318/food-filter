import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ui from './ui_reducer';
import searchResultsReducer from './searchResultsReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  searchResults: searchResultsReducer,
  errors: errorReducer,
  ui: ui,

});
