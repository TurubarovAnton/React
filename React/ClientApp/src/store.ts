import { Store, createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as Security from './security/store'

export interface State {
    security: Security.State
}

export const store: Store = createStore(combineReducers({
    security: Security.reducer
}), applyMiddleware(thunk));

console.log(store.getState());