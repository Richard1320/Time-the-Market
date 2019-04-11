import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

const middleware = applyMiddleware(thunk);
// const middleware = applyMiddleware(thunk, logger);

export default createStore(rootReducer, middleware);
