import errorReducer from './errorReducer';
//import authReducer from './authReducer';
import componentReducer from './components_reducer';
import {combineReducers} from 'redux';

const appReducer = combineReducers({
	// item:getDataReducer,
	entity:componentReducer,
	errors: errorReducer,
    //auth: authReducer
})
  
export default appReducer;
