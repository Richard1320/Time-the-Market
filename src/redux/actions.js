import axios from 'axios';
import store from './store';

import {
  FETCH_DATA_FULFILLED,
  ADVANCE_NEW_MONTH,
  UPDATE_RUNNING_DATA,
  UPDATE_NET_WORTH,
  START_GAME,
  TRIGGER_BUY_SELL,
  CHANGE_TIME_PERIOD,
  CHANGE_START_INVESTED,
} from './actionTypes';

function isEnd() {
  // Check if timeline is over
  return store.getState().counter > store.getState().timePeriod;
}
function gameTickCallback() {
  if (isEnd()) {
  } else {
    setTimeout(gameTick, 100);
  }
}

function gameTick() {
  store.dispatch({ type: ADVANCE_NEW_MONTH });
  store.dispatch({ type: UPDATE_RUNNING_DATA });
  if (isHolding()) store.dispatch({ type: UPDATE_NET_WORTH });

  gameTickCallback();
}
function isHolding() {
  // Every buy and sell is an item in the transaction log
  // Odd number of items in log is holding (bought)
  // Even number of items in log is waiting (sold)
  let transactionLength = store.getState().transactionLog.length;
  return transactionLength % 2 === 1;
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
    dispatch({ type: START_GAME });
    // Add starting month to running data
    dispatch({ type: UPDATE_RUNNING_DATA });
    gameTick();
  };
}
// export function startGameHandler() {
//   return {
//     type: START_GAME,
//   };
// }

// export function advanceNewMonth() {
//   return {
//     type: ADVANCE_NEW_MONTH,
//   };
// }
// export function updateRunningData() {
//   return {
//     type: UPDATE_RUNNING_DATA,
//   };
// }
// export function calculateNetWorth() {
//   return {
//     type: CALCULATE_NET_WORTH,
//   };
// }
export function buySellHandler(value) {
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
