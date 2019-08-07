import axios from 'axios';
import store from './store';

import * as actionTypes from './actionTypes';
import {stateTypes} from './initialState';
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";

interface IActions {
  type: string;
  payload?: any;
}

export function gameTick(): void {
  store.dispatch({type: actionTypes.ADVANCE_NEW_MONTH});
  store.dispatch({type: actionTypes.UPDATE_RUNNING_DATA});
  store.dispatch({type: actionTypes.UPDATE_NET_WORTH});

  let state: stateTypes = store.getState();
  let counter = state.counter;
  let timePeriod = state.timePeriod;
  // Check if game has ended
  if (counter >= timePeriod) {
    store.dispatch({type: actionTypes.STOP_GAME});
  } else {
    let gameSpeed = 200 / state.gameSpeed;
    let timeoutID = setTimeout(gameTick, gameSpeed);
    store.dispatch({type: actionTypes.UPDATE_TIMEOUT, payload: timeoutID});
  }
}

export function fetchData(): ThunkAction<void, any, void, AnyAction> {
  return (dispatch: any) => {
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

export function startGameHandler(startIndex?: number): ThunkAction<void, any, void, AnyAction> {
  return (dispatch: any) => {
    stopGameHandler();

    // Randomize start index if not provided
    if (!startIndex) {
      let count = store.getState().historicalData.length;
      let maxStart = count - store.getState().timePeriod;
      startIndex = Math.floor(Math.random() * Math.floor(maxStart));
    }

    dispatch({
      type: actionTypes.START_GAME,
      payload: {startIndex: startIndex},
    });
    // Add starting month to running data
    dispatch({type: actionTypes.UPDATE_RUNNING_DATA});
    gameTick();
  };
}

export function fetchDataRequest(): IActions {
  return {
    type: actionTypes.FETCH_DATA_REQUEST,
  };
}

export function stopGameHandler(): IActions {
  let timeoutID = store.getState().runningTimeout;

  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  return {
    type: actionTypes.STOP_GAME,
  };
}

export function buySellHandler(): IActions {
  return {
    type: actionTypes.TRIGGER_BUY_SELL,
  };
}

export function startInvestedHandler(value: boolean): IActions {
  return {
    type: actionTypes.CHANGE_START_INVESTED,
    payload: value,
  };
}

export function timePeriodHandler(value: number): IActions {
  return {
    type: actionTypes.CHANGE_TIME_PERIOD,
    payload: value,
  };
}

export function gameSpeedHandler(value: number): IActions {
  return {
    type: actionTypes.CHANGE_GAME_SPEED,
    payload: value,
  };
}
