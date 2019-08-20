import {Reducer} from 'redux';
import * as actionTypes from './actionTypes';

import initialState, {IDataPoint} from './initialState';
import {isHolding} from '../Helpers';

// export default combineReducers({ historicalData });

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
		case actionTypes.FETCH_DATA_FULFILLED:
			return {...state, historicalData: action.payload};
		case actionTypes.CHANGE_GAME_SPEED:
			let gameSpeed = parseFloat(action.payload);
			return {...state, gameSpeed: gameSpeed};
		case actionTypes.ADVANCE_NEW_MONTH: {
			let counter = state.counter + 1;
			return {...state, counter: counter};
		}
		case actionTypes.CHANGE_TIME_PERIOD: {
			let timePeriod = parseInt(action.payload);
			return {...state, timePeriod: timePeriod};
		}
		case actionTypes.CHANGE_START_INVESTED: {
			return {...state, startInvested: action.payload};
		}
		case actionTypes.TRIGGER_BUY_SELL: {
			let transactionLog: string[] = state.transactionLog.slice(0);
			let thisMonthIndex = state.startIndex + state.counter;
			let thisMonthData: IDataPoint =
				state.historicalData[thisMonthIndex];
			let thisMonthDate = thisMonthData.Date;

			transactionLog.push(thisMonthDate);

			return {...state, transactionLog: transactionLog};
		}
		case actionTypes.UPDATE_RUNNING_DATA: {
			let counter = state.counter;
			let sliceStart = state.startIndex;
			let sliceEnd = state.startIndex + counter;
			let runningData = state.historicalData.slice(sliceStart, sliceEnd);
			return {...state, runningData: runningData};
		}
		case actionTypes.UPDATE_NET_WORTH: {
			let netWorth = state.netWorth;
			let holdNetWorth = state.holdNetWorth;
			let lastTwo: Array<IDataPoint> = state.runningData.slice(-2);
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

				return {...state, netWorth: netWorth, holdNetWorth: holdNetWorth};
			} else {
				return state;
			}
		}
		case actionTypes.START_GAME: {
			// Randomize start index
			let transactionLog = [];

			if (state.startInvested) {
				let startItem: IDataPoint =
					state.historicalData[action.payload.startIndex];
				transactionLog.push(startItem.Date);
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

			return {...state, ...resetState};
		}
		case actionTypes.STOP_GAME: {
			// Reset variables
			let resetState = {
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
