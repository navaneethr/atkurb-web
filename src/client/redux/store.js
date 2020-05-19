import rootReducer from "./reducers/rootReducer";
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Redux Thunk returns a function instead of an Object which allows us to perform async actions

export default createStore(rootReducer, composeEnhancers( applyMiddleware(thunk, logger) ));
