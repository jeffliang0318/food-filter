import axios from 'axios';
export const LOGIN_USER = 'login_user';
export const REGISTER_USER = 'register_user';

export const loginUser = (user) => async dispatch => {
  const res = await axios.post('/users/login', user);

  dispatch({ type: LOGIN_USER, payload: res.data });
};

export const registerUser = (user) => async dispatch => {
  let res;
  console.log(user);
  try {
    res = await axios.post('/users/register', user);
  } catch(error) {
    console.log(error)
  }
  // const res = await axios.post('/users/register', user);
  //
  // dispatch({ type: LOGIN_USER, payload: res.data });
};
