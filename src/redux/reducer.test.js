import reducer from './reducer';
import * as actionTypes from './actionTypes';

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

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_GAME_SPEED', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.CHANGE_GAME_SPEED,
        payload: 0.5,
      })
    ).toEqual({ ...initialState, gameSpeed: 0.5 });
  });

  it('should handle ADVANCE_NEW_MONTH', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.ADVANCE_NEW_MONTH,
      })
    ).toEqual({ ...initialState, counter: 1 });
  });

  it('should handle CHANGE_TIME_PERIOD', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.CHANGE_TIME_PERIOD,
        payload: 240,
      })
    ).toEqual({ ...initialState, timePeriod: 240 });
  });

  it('should handle CHANGE_START_INVESTED', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.CHANGE_START_INVESTED,
        payload: true,
      })
    ).toEqual({ ...initialState, startInvested: true });
  });
  // it('should handle TRIGGER_BUY_SELL', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: actionTypes.TRIGGER_BUY_SELL,
  //     })
  //   ).toEqual({ ...initialState, counter: 1 });
  // });
  // it('should handle UPDATE_RUNNING_DATA', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: actionTypes.TRIGGER_BUY_SELL,
  //     })
  //   ).toEqual({ ...initialState, counter: 1 });
  // });
  // it('should handle UPDATE_NET_WORTH', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: actionTypes.TRIGGER_BUY_SELL,
  //     })
  //   ).toEqual({ ...initialState, counter: 1 });
  // });
  // it('should handle START_GAME', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: actionTypes.TRIGGER_BUY_SELL,
  //     })
  //   ).toEqual({ ...initialState, counter: 1 });
  // });

  it('should handle STOP_GAME', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.STOP_GAME,
      })
    ).toEqual({ ...initialState, runningTimeout: false, isPlaying: false });
  });
});
