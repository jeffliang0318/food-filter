import axios from 'axios';

export const FETCH_PRODUCT = 'fetch_product';
export const FETCH_ERROR = 'fetch_error';

export const receiveErrors = errors => ({
  type: FETCH_ERROR,
  errors
});


export const fetch_product = upc => async dispatch => {
  if(upc === "") upc = "''";
  const ndbRes = await axios.get(
    `https://api.nal.usda.gov/ndb/search/?format=json&q=${upc}&api_key=isSv3qRSg7VBxruUEqYSxZbrmiEwkhpTTMsss1Ci`
  );

  let ndbno;

  if (ndbRes.data.list){
    ndbno = ndbRes.data.list.item[0].ndbno;
    const productRes = await axios.get(
      `https://api.nal.usda.gov/ndb/reports/?ndbno=${ndbno}&type=b&format=json&api_key=isSv3qRSg7VBxruUEqYSxZbrmiEwkhpTTMsss1Ci`
    );

    dispatch({
      type: FETCH_PRODUCT,
      searchResults: productRes.data.report.food
    });

  } else {
    dispatch({
      type: FETCH_PRODUCT,
      searchResults: ""
    });

    dispatch({
      type: FETCH_ERROR,
      errors: ndbRes.data.errors.error[0].message
    });
  }

};
