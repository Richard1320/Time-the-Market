import {applyMiddleware, createStore} from 'redux';
import {thunk} from 'redux-thunk';
import {vi} from 'vitest';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import rootReducer from './reducer';
import appStore from './store';

describe('actions', () => {
	it('should create an action to fetch data', () => {
		const expectedAction = {
			type: actionTypes.FETCH_DATA_REQUEST,
		};
		expect(actions.fetchDataRequest()).toEqual(expectedAction);
	});
	it('should create an action for a failed fetch', () => {
		expect(actions.fetchDataFailed()).toEqual({
			type: actionTypes.FETCH_DATA_FAILED,
			payload: actions.FETCH_ERROR_MESSAGE,
		});
	});
	it('should create an action to buy / sell', () => {
		const expectedAction = {
			type: actionTypes.TRIGGER_BUY_SELL,
		};
		expect(actions.buySellHandler()).toEqual(expectedAction);
	});
	it('should create an action to update start invested option', () => {
		const value = true;
		const expectedAction = {
			type: actionTypes.CHANGE_START_INVESTED,
			payload: value,
		};
		expect(actions.startInvestedHandler(value)).toEqual(expectedAction);
	});
	it('should create an action to update time period', () => {
		const value = 240;
		const expectedAction = {
			type: actionTypes.CHANGE_TIME_PERIOD,
			payload: value,
		};
		expect(actions.timePeriodHandler(value)).toEqual(expectedAction);
	});
	it('should create an action to update game speed', () => {
		const value = 0.5;
		const expectedAction = {
			type: actionTypes.CHANGE_GAME_SPEED,
			payload: value,
		};
		expect(actions.gameSpeedHandler(value)).toEqual(expectedAction);
	});
	it('should create an action to stop game', () => {
		const expectedAction = {
			type: actionTypes.STOP_GAME,
		};
		expect(actions.stopGameHandler()).toEqual(expectedAction);
	});
});

describe('async actions', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('stores fetched data in historicalData', async () => {
		const data = [{Date: '1871-01-01', SP500: 4.44}];
		const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(data)));
		vi.stubGlobal('fetch', fetchMock);

		const store = createStore(rootReducer, applyMiddleware(thunk));
		await store.dispatch(actions.fetchData());

		expect(fetchMock).toHaveBeenCalledWith('/data/historical-sp500.json');
		expect(store.getState().historicalData).toEqual(data);
	});

	describe('when fetching data fails', () => {
		let consoleError;

		// Returns the store's state after fetchData settles, with fetch stubbed
		async function fetchWith(fetchMock) {
			vi.stubGlobal('fetch', fetchMock);
			const store = createStore(rootReducer, applyMiddleware(thunk));
			await store.dispatch(actions.fetchData());
			return store.getState();
		}

		beforeEach(() => {
			consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
		});
		afterEach(() => {
			consoleError.mockRestore();
		});

		it('should not store the body of a non-ok response', async () => {
			const body = JSON.stringify({message: 'Not found'});
			const state = await fetchWith(
				vi.fn().mockResolvedValue(new Response(body, {status: 404}))
			);

			expect(state.historicalData).toEqual([]);
			expect(state.fetchError).toEqual(actions.FETCH_ERROR_MESSAGE);
			expect(consoleError.mock.calls[0][0].message).toContain('404');
		});
		it('should log a network failure', async () => {
			const error = new TypeError('Failed to fetch');
			const state = await fetchWith(vi.fn().mockRejectedValue(error));

			expect(state.historicalData).toEqual([]);
			expect(state.fetchError).toEqual(actions.FETCH_ERROR_MESSAGE);
			expect(consoleError).toHaveBeenCalledWith(error);
		});
		it('should log a response that is not JSON', async () => {
			const state = await fetchWith(
				vi.fn().mockResolvedValue(new Response('<!DOCTYPE html>'))
			);

			expect(state.historicalData).toEqual([]);
			expect(state.fetchError).toEqual(actions.FETCH_ERROR_MESSAGE);
			expect(consoleError.mock.calls[0][0]).toBeInstanceOf(SyntaxError);
		});
	});

	// The game loop in actions.ts runs on the app's singleton store, so this
	// test has to use that store rather than a fresh one.
	describe('game loop', () => {
		const data = Array.from({length: 200}, (_, i) => ({
			Date: `month-${i}`,
			SP500: 100 + i,
			Dividend: 1,
		}));

		beforeEach(() => {
			vi.useFakeTimers();
			appStore.dispatch({type: actionTypes.FETCH_DATA_FULFILLED, payload: data});
		});
		afterEach(() => {
			appStore.dispatch(actions.stopGameHandler());
			appStore.dispatch({type: actionTypes.RESET_STORE});
			vi.useRealTimers();
		});

		it('should start the game from the given index', () => {
			appStore.dispatch(actions.startGameHandler(20));

			const state = appStore.getState();
			expect(state.isPlaying).toEqual(true);
			expect(state.startIndex).toEqual(20);
			expect(state.runningData).toEqual([data[20]]);
		});
		it('should stop the game once the time period has elapsed', () => {
			appStore.dispatch(actions.startGameHandler(20));
			vi.runAllTimers();

			const state = appStore.getState();
			expect(state.isPlaying).toEqual(false);
			expect(state.counter).toEqual(state.timePeriod);
			expect(state.runningData).toEqual(data.slice(20, 20 + state.timePeriod));
		});
	});
});
