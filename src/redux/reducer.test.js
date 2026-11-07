import reducer from './reducer';
import * as actionTypes from './actionTypes';

import initialState from './initialState';

describe('reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('should handle FETCH_DATA_FAILED', () => {
		expect(
			reducer(undefined, {
				type: actionTypes.FETCH_DATA_FAILED,
				payload: 'Failed',
			}).fetchError
		).toEqual('Failed');
	});

	it('should clear the fetch error on FETCH_DATA_REQUEST', () => {
		expect(
			reducer(
				{...initialState, fetchError: 'Failed'},
				{type: actionTypes.FETCH_DATA_REQUEST}
			).fetchError
		).toBeNull();
	});

	it('should handle CHANGE_GAME_SPEED', () => {
		expect(
			reducer(undefined, {
				type: actionTypes.CHANGE_GAME_SPEED,
				payload: 0.5,
			})
		).toEqual({...initialState, gameSpeed: 0.5});
	});

	it('should handle ADVANCE_NEW_MONTH', () => {
		expect(
			reducer(undefined, {
				type: actionTypes.ADVANCE_NEW_MONTH,
			})
		).toEqual({...initialState, counter: 1});
	});

	it('should handle CHANGE_TIME_PERIOD', () => {
		expect(
			reducer(undefined, {
				type: actionTypes.CHANGE_TIME_PERIOD,
				payload: 240,
			})
		).toEqual({...initialState, timePeriod: 240});
	});

	it('should handle CHANGE_START_INVESTED', () => {
		expect(
			reducer(undefined, {
				type: actionTypes.CHANGE_START_INVESTED,
				payload: true,
			})
		).toEqual({...initialState, startInvested: true});
	});

	it('should handle STOP_GAME', () => {
		expect(
			reducer(undefined, {
				type: actionTypes.STOP_GAME,
			})
		).toEqual({...initialState, runningTimeout: false, isPlaying: false});
	});
});
