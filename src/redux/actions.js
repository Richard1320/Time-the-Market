import axios from 'axios';
import store from './store';

import {
  FETCH_DATA_FULFILLED,
  ADVANCE_NEW_MONTH,
  UPDATE_RUNNING_DATA,
  UPDATE_NET_WORTH,
  START_GAME,
  STOP_GAME,
  TRIGGER_BUY_SELL,
  CHANGE_TIME_PERIOD,
  CHANGE_GAME_SPEED,
  CHANGE_START_INVESTED,
  UPDATE_TIMEOUT,
} from './actionTypes';

function gameTick() {
  store.dispatch({ type: ADVANCE_NEW_MONTH });
  store.dispatch({ type: UPDATE_RUNNING_DATA });
  store.dispatch({ type: UPDATE_NET_WORTH });

  let counter = store.getState().counter;
  let timePeriod = store.getState().timePeriod;
  // Check if game has ended
  if (counter > timePeriod) {
    store.dispatch({ type: STOP_GAME });
  } else {
    let gameSpeed = 200 / store.getState().gameSpeed;
    let timeoutID = setTimeout(gameTick, gameSpeed);
    store.dispatch({ type: UPDATE_TIMEOUT, payload: timeoutID });
  }
}

export function fetchData() {
  return dispatch => {
    axios
      .get('/data/historical-sp500.json')
      .then(response => {
        dispatch({ type: FETCH_DATA_FULFILLED, payload: response.data });
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

    dispatch({ type: START_GAME, payload: { startIndex: startIndex } });
    // Add starting month to running data
    dispatch({ type: UPDATE_RUNNING_DATA });
    gameTick();
  };
}
export function stopGameHandler() {
  let timeoutID = store.getState().runningTimeout;

  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  return {
    type: STOP_GAME,
  };
}
export function buySellHandler() {
  return {
    type: TRIGGER_BUY_SELL,
  };
}
export function startInvestedHandler(value) {
  return {
    type: CHANGE_START_INVESTED,
    payload: value,
  };
}
export function timePeriodHandler(value) {
  return {
    type: CHANGE_TIME_PERIOD,
    payload: value,
  };
}
export function gameSpeedHandler(value) {
  return {
    type: CHANGE_GAME_SPEED,
    payload: value,
  };
}
