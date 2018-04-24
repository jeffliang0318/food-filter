import { combineReducers } from 'redux';
import authReducer from './authReducer';
import ui from './ui_reducer';

export default combineReducers({
  auth: authReducer,
  ui: ui
});
