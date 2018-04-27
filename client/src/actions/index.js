import axios from 'axios';

export const FETCH_USER = 'fetch_user';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateAllergyIngredient = (ingredient) => async dispatch => {

  const res = await axios.post('/api/current_user', ingredient);
  // console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};
