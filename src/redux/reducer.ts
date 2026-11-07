import {Reducer} from 'redux';
import * as actionTypes from './actionTypes';

import initialState, {IDataPoint} from './initialState';
import {isHolding} from '../Helpers';

interface IActions {
	type: string;
	payload?: any;
}

const reducer: Reducer = (
	state = initialState,
	action: IActions
) => {
	switch (action.type) {
		case actionTypes.RESET_STORE:
			// Reset state but keep historical data
			return {...initialState, historicalData: state.historicalData};
		case actionTypes.FETCH_DATA_REQUEST:
			return {...state, fetchError: null};
		case actionTypes.FETCH_DATA_FULFILLED:
			return {...state, historicalData: action.payload};
		case actionTypes.FETCH_DATA_FAILED:
			return {...state, fetchError: action.payload};
		case actionTypes.CHANGE_GAME_SPEED:
			const gameSpeed = parseFloat(action.payload);
			return {...state, gameSpeed: gameSpeed};
		case actionTypes.ADVANCE_NEW_MONTH: {
			const counter = state.counter + 1;
			return {...state, counter: counter};
		}
		case actionTypes.CHANGE_TIME_PERIOD: {
			const timePeriod = parseInt(action.payload);
			return {...state, timePeriod: timePeriod};
		}
		case actionTypes.CHANGE_START_INVESTED: {
			return {...state, startInvested: action.payload};
		}
		case actionTypes.TRIGGER_BUY_SELL: {
			const transactionLog: string[] = state.transactionLog.slice(0);
			const thisMonthIndex = state.startIndex + state.counter;
			const thisMonthData: IDataPoint =
				state.historicalData[thisMonthIndex];
			const thisMonthDate = thisMonthData.Date;

			transactionLog.push(thisMonthDate);

			return {...state, transactionLog: transactionLog};
		}
		case actionTypes.UPDATE_RUNNING_DATA: {
			const counter = state.counter;
			const sliceStart = state.startIndex;
			const sliceEnd = state.startIndex + counter;
			const runningData = state.historicalData.slice(sliceStart, sliceEnd);
			return {...state, runningData: runningData};
		}
		case actionTypes.UPDATE_NET_WORTH: {
			let netWorth = state.netWorth;
			let holdNetWorth = state.holdNetWorth;
			const lastTwo: Array<IDataPoint> = state.runningData.slice(-2);
			const transactionLog = state.transactionLog;

			// Check if running data has at least two months
			if (lastTwo[1]) {
				const lastMonthPrice = lastTwo[0].SP500;
				const thisMonthPrice = lastTwo[1].SP500;
				const gainPercent = (thisMonthPrice - lastMonthPrice) / lastMonthPrice;
				const monthlyDividend = lastTwo[1].Dividend / 12;

				// If holding, update personal net worth
				if (isHolding(transactionLog)) {
					netWorth = netWorth * (1 + gainPercent) + monthlyDividend;
				}

				// Update amount for just holding
				holdNetWorth = holdNetWorth * (1 + gainPercent) + monthlyDividend;

				return {...state, netWorth: netWorth, holdNetWorth: holdNetWorth};
			} else {
				return state;
			}
		}
		case actionTypes.START_GAME: {
			// Randomize start index
			const transactionLog = [];

			if (state.startInvested) {
				const startItem: IDataPoint =
					state.historicalData[action.payload.startIndex];
				transactionLog.push(startItem.Date);
			}

			// Reset variables
			const resetState = {
				counter: 0,
				runningData: [],
				startIndex: action.payload.startIndex,
				transactionLog: transactionLog,
				netWorth: 10000,
				holdNetWorth: 10000,
				isPlaying: true,
			};

			return {...state, ...resetState};
		}
		case actionTypes.STOP_GAME: {
			// Reset variables
			const resetState = {
				runningTimeout: false,
				isPlaying: false,
			};

			return {...state, ...resetState};
		}
		case actionTypes.UPDATE_TIMEOUT: {
			return {...state, runningTimeout: action.payload};
		}
		default:
			return state;
	}
};
export default reducer;
