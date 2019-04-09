import axios from 'axios';

export function fetchData() {
  return function(dispatch) {
    axios
      .get('/data/historical-sp500.json')
      .then(response => {
        dispatch({ type: 'FETCH_DATA_FULFILLED', payload: response.data });
      })
      .catch(err => {
        console.error(err);
      });
  };
}
