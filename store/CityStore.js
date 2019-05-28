
import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import rootReducer from '../reducers/RootReducer';

let store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
