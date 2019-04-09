// import { combineReducers } from 'redux';
// import historicalData from './historicalData';

// export default combineReducers({ historicalData });

const initialState = {
  historicalData: {},
  startIndex: 0,
  counter: 0,
  timePeriod: 120,
  runningData: [],
  netWorth: 10000,
  transactionLog: [],
  startInvested: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_FULFILLED':
      return { ...state, historicalData: action.payload };
    default:
      return state;
  }
};
export default reducer;
