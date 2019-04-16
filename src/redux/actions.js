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
  CHANGE_START_INVESTED,
  UPDATE_TIMEOUT,
} from './actionTypes';
import { isEnd, isHolding } from '../Helpers';

function gameTickCallback() {
  let counter = store.getState().counter;
  let timePeriod = store.getState().timePeriod;
  if (isEnd(counter, timePeriod)) {
  } else {
    let timeoutID = setTimeout(gameTick, 100);
    store.dispatch({ type: UPDATE_TIMEOUT, payload: timeoutID });
  }
}

function gameTick() {
  store.dispatch({ type: ADVANCE_NEW_MONTH });
  store.dispatch({ type: UPDATE_RUNNING_DATA });
  let transactionLog = store.getState().transactionLog;
  if (isHolding(transactionLog)) store.dispatch({ type: UPDATE_NET_WORTH });

  gameTickCallback();
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
