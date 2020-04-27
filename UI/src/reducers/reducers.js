
import { combineReducers } from 'redux';
import riderReducer from './riderReducer';

export default combineReducers({
    rider : riderReducer
});