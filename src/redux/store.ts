import {UnknownAction, applyMiddleware, createStore, Middleware} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';
import immutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from './reducer';
// import logger from 'redux-logger';

export type AppDispatch = ThunkDispatch<any, void, UnknownAction>;

let middleware: Middleware[] = [thunk];

if (import.meta.env.DEV && import.meta.env.MODE !== 'test') {
	// Be sure to ONLY add this middleware in development!
	middleware = [
		// CommonJS package that only sets exports.default
		immutableStateInvariant.default(),
		// logger,
		thunk,
	];
}

export default createStore(rootReducer, applyMiddleware(...middleware));
