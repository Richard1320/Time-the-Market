import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import expect from 'expect'; // You can use any testing library

import * as actions from './actions';
import * as actionTypes from './actionTypes';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should create an action to fetch data', () => {
    const expectedAction = {
      type: actionTypes.FETCH_DATA_REQUEST,
    };
    expect(actions.fetchDataRequest()).toEqual(expectedAction);
  });
  it('should create an action to buy / sell', () => {
    const expectedAction = {
      type: actionTypes.TRIGGER_BUY_SELL,
    };
    expect(actions.buySellHandler()).toEqual(expectedAction);
  });
  it('should create an action to update start invested option', () => {
    const value = true;
    const expectedAction = {
      type: actionTypes.CHANGE_START_INVESTED,
      payload: value,
    };
    expect(actions.startInvestedHandler(value)).toEqual(expectedAction);
  });
  it('should create an action to update time period', () => {
    const value = 240;
    const expectedAction = {
      type: actionTypes.CHANGE_TIME_PERIOD,
      payload: value,
    };
    expect(actions.timePeriodHandler(value)).toEqual(expectedAction);
  });
  it('should create an action to update game speed', () => {
    const value = 0.5;
    const expectedAction = {
      type: actionTypes.CHANGE_GAME_SPEED,
      payload: value,
    };
    expect(actions.gameSpeedHandler(value)).toEqual(expectedAction);
  });
  // it('should create an action to start game', () => {
  //   const value = 0.5;
  //   const expectedAction = {
  //     type: actionTypes.CHANGE_GAME_SPEED,
  //     payload: value,
  //   };
  //   expect(actions.gameSpeedHandler(value)).toEqual(expectedAction);
  // });
  it('should create an action to stop game', () => {
    const expectedAction = {
      type: actionTypes.STOP_GAME,
    };
    expect(actions.stopGameHandler()).toEqual(expectedAction);
  });
});

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
      { type: actionTypes.FETCH_DATA_REQUEST },
      { type: actionTypes.FETCH_DATA_FULFILLED, payload: data },
    ];
    const store = mockStore({ historicalData: [] });

    return store.dispatch(actions.fetchData()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
