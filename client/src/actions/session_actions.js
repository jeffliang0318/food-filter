import axios from 'axios';
export const LOGIN_USER = 'login_user';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_USER = 'FETCH_USER';
export const REGISTER_USER = 'REGISTER_USER';

export const loginUser = (user) => async dispatch => {
  const res = await axios.post('/users/login', user);

  dispatch({ type: LOGIN_USER, payload: res.data });
};

export const registerUser = (user) => async dispatch => {

  let res;
  try {
    res = await axios.post('/users/register', user);
    // console.log(res);
    
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch(error) {
    dispatch({ type: FETCH_ERROR, payload: error });
    // console.log(error)
  }
  // const res = await axios.post('/users/register', user);
  //
  // dispatch({ type: LOGIN_USER, payload: res.data });
};
