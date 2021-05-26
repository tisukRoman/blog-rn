import { createStore, combineReducers, applyMiddleware } from 'redux'
import { postReducer } from './reducers/postReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
    postReducer
});

export const store = createStore(reducers, applyMiddleware(thunk));