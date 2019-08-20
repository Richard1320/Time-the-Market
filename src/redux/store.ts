import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
// import logger from 'redux-logger';

let middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
	// Be sure to ONLY add this middleware in development!
	middleware = [
		require('redux-immutable-state-invariant').default(),
		// logger,
		thunk,
	];
}

if (process.env.NODE_ENV === 'test') {
	// Be sure to ONLY add this middleware in development!
	middleware = [thunk];
}

export default createStore(rootReducer, applyMiddleware(...middleware));
