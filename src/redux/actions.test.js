import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import expect from 'expect'; // You can use any testing library

import * as actions from './actions';
import * as types from './actionTypes';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// describe('async actions', () => {
//   it('returns data when sendMessage is called', done => {
//     var mock = new MockAdapter(axios);
//     const data = { response: true };
//     mock.onGet('/data/historical-sp500.json').reply(200, data);

//     actions.fetchData().then(response => {
//       expect(response).toEqual(data);
//       done();
//     });
//   });
// });
describe('async actions', () => {
  let mock;
  afterEach(() => {
    mock.restore();
  });
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it('creates FETCH_DATA_FULFILLED when fetching data has been done', () => {
    const data = { response: true };
    mock.onGet('/data/historical-sp500.json').reply(200, data);

    const expectedActions = [
      { type: types.FETCH_DATA_REQUEST },
      { type: types.FETCH_DATA_FULFILLED, payload: data },
    ];
    const store = mockStore({ historicalData: [] });

    return store.dispatch(actions.fetchData()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
