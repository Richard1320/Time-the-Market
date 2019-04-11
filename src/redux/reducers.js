// import { combineReducers } from 'redux';
// import historicalData from './historicalData';

// export default combineReducers({ historicalData });

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

const initialState = {
  historicalData: {},
  startIndex: 0,
  counter: 0,
  timePeriod: 120,
  runningData: [],
  netWorth: 10000,
  transactionLog: [],
  startInvested: false,
  runningTimeout: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_FULFILLED:
      return { ...state, historicalData: action.payload };
    case ADVANCE_NEW_MONTH: {
      let counter = state.counter + 1;
      return { ...state, counter: counter };
    }
    case CHANGE_TIME_PERIOD: {
      return { ...state, timePeriod: action.payload };
    }
    case CHANGE_START_INVESTED: {
      return { ...state, startInvested: action.payload };
    }
    case TRIGGER_BUY_SELL: {
      let transactionLog = state.transactionLog.slice(0);
      let thisMonthIndex = state.startIndex + state.counter;
      let thisMonthData = state.historicalData[thisMonthIndex];
      let thisMonthDate = thisMonthData.Date;

      transactionLog.push(thisMonthDate);

      return { ...state, transactionLog: transactionLog };
    }
    case UPDATE_RUNNING_DATA: {
      let counter = state.counter;
      let sliceStart = state.startIndex;
      let sliceEnd = state.startIndex + counter;
      let runningData = state.historicalData.slice(sliceStart, sliceEnd);
      return { ...state, runningData: runningData };
    }
    case UPDATE_NET_WORTH: {
      let netWorth = state.netWorth;
      let lastTwo = state.runningData.slice(-2);

      // Check if running data has at least two months
      // And this month is not a "buy" month
      if (lastTwo[1]) {
        let lastMonthPrice = lastTwo[0].SP500;
        let thisMonthPrice = lastTwo[1].SP500;
        let gainPercent = (thisMonthPrice - lastMonthPrice) / lastMonthPrice;

        netWorth = netWorth * (1 + gainPercent);

        return { ...state, netWorth: netWorth };
      } else {
        return state;
      }
    }
    case START_GAME: {
      // Randomize start index
      let count = state.historicalData.length;
      let maxStart = count - state.timePeriod;
      let startIndex = Math.floor(Math.random() * Math.floor(maxStart));
      let transactionLog = [];

      if (state.startInvested) {
        transactionLog.push(state.historicalData[startIndex].Date);
      }

      // Reset variables
      let resetState = {
        counter: 0,
        runningData: [],
        startIndex: startIndex,
        transactionLog: transactionLog,
        netWorth: 10000,
      };

      return { ...state, ...resetState };
    }
    default:
      return state;
  }
};
export default reducer;
