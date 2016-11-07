import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

export default createStore(reducer)
