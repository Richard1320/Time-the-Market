import axios from 'axios';
import store from './store';

import * as actionTypes from './actionTypes';

function gameTick() {
  store.dispatch({ type: actionTypes.ADVANCE_NEW_MONTH });
  store.dispatch({ type: actionTypes.UPDATE_RUNNING_DATA });
  store.dispatch({ type: actionTypes.UPDATE_NET_WORTH });

  let counter = store.getState().counter;
  let timePeriod = store.getState().timePeriod;
  // Check if game has ended
  if (counter > timePeriod) {
    store.dispatch({ type: actionTypes.STOP_GAME });
  } else {
    let gameSpeed = 200 / store.getState().gameSpeed;
    let timeoutID = setTimeout(gameTick, gameSpeed);
    store.dispatch({ type: actionTypes.UPDATE_TIMEOUT, payload: timeoutID });
  }
}

export function fetchData() {
  return dispatch => {
    dispatch(fetchDataRequest());
    return axios
      .get('/data/historical-sp500.json')
      .then(response => {
        dispatch({
          type: actionTypes.FETCH_DATA_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
}
export function startGameHandler() {
  return dispatch => {
    stopGameHandler();

    let count = store.getState().historicalData.length;
    let maxStart = count - store.getState().timePeriod;
    let startIndex = Math.floor(Math.random() * Math.floor(maxStart));

    dispatch({
      type: actionTypes.START_GAME,
      payload: { startIndex: startIndex },
    });
    // Add starting month to running data
    dispatch({ type: actionTypes.UPDATE_RUNNING_DATA });
    gameTick();
  };
}
function fetchDataRequest() {
  return {
    type: actionTypes.FETCH_DATA_REQUEST,
  };
}
export function stopGameHandler() {
  let timeoutID = store.getState().runningTimeout;

  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  return {
    type: actionTypes.STOP_GAME,
  };
}
export function buySellHandler() {
  return {
    type: actionTypes.TRIGGER_BUY_SELL,
  };
}
export function startInvestedHandler(value) {
  return {
    type: actionTypes.CHANGE_START_INVESTED,
    payload: value,
  };
}
export function timePeriodHandler(value) {
  return {
    type: actionTypes.CHANGE_TIME_PERIOD,
    payload: value,
  };
}
export function gameSpeedHandler(value) {
  return {
    type: actionTypes.CHANGE_GAME_SPEED,
    payload: value,
  };
}
