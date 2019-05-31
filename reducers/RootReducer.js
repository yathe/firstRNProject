
import {combineReducers} from "redux";
import city from './CityReducer';
import location from './LocationReducer';
import comments from './CommentReducer';

export default rootReducer = combineReducers({
    city,
    location,
    comments,
})