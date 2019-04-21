// import { combineReducers } from 'redux';

// export default combineReducers({ historicalData });

import * as actionTypes from './actionTypes';

import { isHolding } from '../Helpers';

const initialState = {
  historicalData: [],
  startIndex: 0,
  counter: 0,
  timePeriod: 120,
  runningData: [],
  netWorth: 10000,
  holdNetWorth: 10000,
  transactionLog: [],
  startInvested: false,
  runningTimeout: false,
  isPlaying: false,
  gameSpeed: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_FULFILLED:
      return { ...state, historicalData: action.payload };
    case actionTypes.CHANGE_GAME_SPEED:
      let gameSpeed = parseFloat(action.payload);
      return { ...state, gameSpeed: gameSpeed };
    case actionTypes.ADVANCE_NEW_MONTH: {
      let counter = state.counter + 1;
      return { ...state, counter: counter };
    }
    case actionTypes.CHANGE_TIME_PERIOD: {
      return { ...state, timePeriod: action.payload };
    }
    case actionTypes.CHANGE_START_INVESTED: {
      return { ...state, startInvested: action.payload };
    }
    case actionTypes.TRIGGER_BUY_SELL: {
      let transactionLog = state.transactionLog.slice(0);
      let thisMonthIndex = state.startIndex + state.counter;
      let thisMonthData = state.historicalData[thisMonthIndex];
      let thisMonthDate = thisMonthData.Date;

      transactionLog.push(thisMonthDate);

      return { ...state, transactionLog: transactionLog };
    }
    case actionTypes.UPDATE_RUNNING_DATA: {
      let counter = state.counter;
      let sliceStart = state.startIndex;
      let sliceEnd = state.startIndex + counter;
      let runningData = state.historicalData.slice(sliceStart, sliceEnd);
      return { ...state, runningData: runningData };
    }
    case actionTypes.UPDATE_NET_WORTH: {
      let netWorth = state.netWorth;
      let holdNetWorth = state.holdNetWorth;
      let lastTwo = state.runningData.slice(-2);
      let transactionLog = state.transactionLog;

      // Check if running data has at least two months
      if (lastTwo[1]) {
        let lastMonthPrice = lastTwo[0].SP500;
        let thisMonthPrice = lastTwo[1].SP500;
        let gainPercent = (thisMonthPrice - lastMonthPrice) / lastMonthPrice;
        let monthlyDividend = lastTwo[1].Dividend / 12;

        // If holding, update personal net worth
        if (isHolding(transactionLog)) {
          netWorth = netWorth * (1 + gainPercent) + monthlyDividend;
        }

        // Update amount for just holding
        holdNetWorth = holdNetWorth * (1 + gainPercent) + monthlyDividend;

        return { ...state, netWorth: netWorth, holdNetWorth: holdNetWorth };
      } else {
        return state;
      }
    }
    case actionTypes.START_GAME: {
      // Randomize start index
      let transactionLog = [];

      if (state.startInvested) {
        transactionLog.push(
          state.historicalData[action.payload.startIndex].Date
        );
      }

      // Reset variables
      let resetState = {
        counter: 0,
        runningData: [],
        startIndex: action.payload.startIndex,
        transactionLog: transactionLog,
        netWorth: 10000,
        holdNetWorth: 10000,
        isPlaying: true,
      };

      return { ...state, ...resetState };
    }
    case actionTypes.STOP_GAME: {
      // Reset variables
      let resetState = {
        runningTimeout: false,
        isPlaying: false,
      };

      return { ...state, ...resetState };
    }
    case actionTypes.UPDATE_TIMEOUT: {
      return { ...state, runningTimeout: action.payload };
    }
    default:
      return state;
  }
};
export default reducer;
