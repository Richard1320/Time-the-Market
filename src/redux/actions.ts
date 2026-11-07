import store from './store';

import * as actionTypes from './actionTypes';
import {stateTypes} from './initialState';
import {ThunkAction} from "redux-thunk";
import {UnknownAction} from "redux";

type IActions<T = any> = {
	type: string;
	payload?: T;
};

export const FETCH_ERROR_MESSAGE =
	'Unable to load S&P 500 data. Please refresh the page to try again.';

export function gameTick(): void {
	store.dispatch({type: actionTypes.ADVANCE_NEW_MONTH});
	store.dispatch({type: actionTypes.UPDATE_RUNNING_DATA});
	store.dispatch({type: actionTypes.UPDATE_NET_WORTH});

	const state: stateTypes = store.getState();
	const counter = state.counter;
	const timePeriod = state.timePeriod;
	// Check if game has ended
	if (counter >= timePeriod) {
		store.dispatch({type: actionTypes.STOP_GAME});
	} else {
		const gameSpeed = 200 / state.gameSpeed;
		const timeoutID = setTimeout(gameTick, gameSpeed);
		store.dispatch({type: actionTypes.UPDATE_TIMEOUT, payload: timeoutID});
	}
}

export function fetchData(): ThunkAction<void, any, void, UnknownAction> {
	return async (dispatch) => {
		dispatch(fetchDataRequest());
		try {
			const response = await fetch('/data/historical-sp500.json');
			if (!response.ok) {
				throw new Error(`Failed to fetch data: ${response.status}`);
			}
			const data = await response.json();
			dispatch({
				type: actionTypes.FETCH_DATA_FULFILLED,
				payload: data,
			});
		} catch (err) {
			console.error(err);
			dispatch(fetchDataFailed());
		}
	};
}

export function startGameHandler(startIndex?: number): ThunkAction<void, any, void, UnknownAction> {
	return (dispatch) => {
		stopGameHandler();

		// Randomize start index if not provided
		if (!startIndex) {
			const count = store.getState().historicalData.length;
			const maxStart = count - store.getState().timePeriod;
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

export function fetchDataRequest(): IActions<void> {
	return {
		type: actionTypes.FETCH_DATA_REQUEST,
	};
}

export function fetchDataFailed(): IActions<string> {
	return {
		type: actionTypes.FETCH_DATA_FAILED,
		payload: FETCH_ERROR_MESSAGE,
	};
}

export function stopGameHandler(): IActions<void> {
	const timeoutID = store.getState().runningTimeout;

	if (timeoutID) {
		clearTimeout(timeoutID);
	}

	return {
		type: actionTypes.STOP_GAME,
	};
}

export function buySellHandler(): IActions<void> {
	return {
		type: actionTypes.TRIGGER_BUY_SELL,
	};
}

export function startInvestedHandler(value: boolean): IActions<boolean> {
	return {
		type: actionTypes.CHANGE_START_INVESTED,
		payload: value,
	};
}

export function timePeriodHandler(value: number): IActions<number> {
	return {
		type: actionTypes.CHANGE_TIME_PERIOD,
		payload: value,
	};
}

export function gameSpeedHandler(value: number): IActions<number> {
	return {
		type: actionTypes.CHANGE_GAME_SPEED,
		payload: value,
	};
}
