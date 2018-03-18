import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import storage from 'store';
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import adminReducer from './admin/reducers';

export const history = createHistory()

const initialState = { admin: storage.get('state') || {} };
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  combineReducers({ admin: adminReducer }),
  initialState,
  composedEnhancers
)

export default store
