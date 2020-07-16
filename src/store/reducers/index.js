import { combineReducers } from 'redux';
import { loginReducer as user } from './loginReducer';
import { workersReducer as workers } from './workersReducer';
import { currentUserReducer as currentUser } from './cureentUserReducer';

const rootReducer = combineReducers({ user, workers, currentUser });

export default rootReducer;
