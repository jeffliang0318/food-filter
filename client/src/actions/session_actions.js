import axios from 'axios';
export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_ERROR = 'fetch_error';
export const FETCH_USER = 'fetch_user';
export const FETCH_AUTH_ERRORS = 'fetch_auth_errors';

// export const REGISTER_USER = 'REGISTER_USER';



export const loginUser = (user) => async dispatch => {
  let res;
  try {
    res = await axios.post('/users/login', user);
    dispatch({ type: FETCH_USER, payload: res.data });
} catch(error) {
  console.log(error.response);
  dispatch({ type: FETCH_AUTH_ERRORS, payload: error });
}
};

export const receiveErrors = (errors) => ({
  type: FETCH_AUTH_ERRORS,
  errors:errors
});

export const registerUser = (user) => dispatch => {

  let res;
  // try {
    // res = await axios.post('/users/register', user);
    axios.post('/users/register', user).then((res) => {
      dispatch({ type: FETCH_USER, payload: res.data });
    }).catch((error) => {
      // console.log(error.response)
      dispatch(receiveErrors(error.response.data.errors))
      // dispatch({ type: FETCH_AUTH_ERRORS, errors: error.response.data.errors });
    });

};
