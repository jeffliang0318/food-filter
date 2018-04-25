import { LOGIN_USER, REGISTER_USER } from './types'

export const loginUser = (user) => async dispatch => {
  const res = await axios.post('/users/login', user);

  dispatch({ type: LOGIN_USER, payload: res.data });
};

export const registerUser = (user) => async dispatch => {
  const res = await axios.post('/users/register', user);

  dispatch({ type: LOGIN_USER, payload: res.data });
};