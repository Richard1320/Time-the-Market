import reducers from './reducers';
import * as types from './ActionTypes';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducers(undefined, {})).toEqual({
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
    });
  });
});
