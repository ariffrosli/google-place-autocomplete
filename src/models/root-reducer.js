import { combineReducers } from 'redux';
import { reducer as autocompleteReducer } from './auto-complete/reducer';

const rootReducer = combineReducers({
    search: autocompleteReducer
});

export default rootReducer;