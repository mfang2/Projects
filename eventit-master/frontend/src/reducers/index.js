import { combineReducers } from 'redux';
import authen from './auth';
export default combineReducers({
    authentication: authen
})