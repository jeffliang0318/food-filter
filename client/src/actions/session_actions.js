import axios from 'axios';
export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_ERROR = 'fetch_error';
export const FETCH_USER = 'fetch_user';
export const FETCH_AUTH_ERRORS = 'fetch_auth_errors';
export const RECEIVE_ERRORS = 'receiveErrors';

// export const REGISTER_USER = 'REGISTER_USER';


export const receiveErrors = (errors) => ({
  type: FETCH_AUTH_ERRORS,
  errors:errors
});

export const loginUser = (user) => dispatch => {

      axios.post('/users/login', user).then((res) => {
      dispatch({ type: FETCH_USER, payload: res.data });
    }).catch((error) => {
      console.log();
      dispatch(receiveErrors(['Invalid username or password']));
    });
};


export const registerUser = (user) => dispatch => {

    axios.post('/users/register', user).then((res) => {
      dispatch({ type: FETCH_USER, payload: res.data });
    }).catch((error) => {
      dispatch(receiveErrors(error.response.data.errors))
    });

};
