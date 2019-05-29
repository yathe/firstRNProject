
import * as types from '../actions/ActionType';

const initialState = [{
    title: '北京',
    temperature: '-',
}];

// store把 两个参数传给reducer，当前state和action
export default function city(state = initialState, action) {
    switch (action.type) {
        case types.ADDCITY:
            return [
                ...state,
                {
                    title: action.title,
                    temperature: action.temperature,
                }
            ];
        case types.DELETECITY:
            const index = state.findIndex(item => item.title == action.title);
            if(index > -1) {
                return [...state.slice(0, index), ...state.slice(index + 1)]
            }
            return state;
        case types.UPDATECITY:
            return state.map((item) => (item.title === action.title) ?
                {...item, temperature: action.temperature} : item
            );
        case types.UPDATECITIES:
            return action.cities;
        default:
            return state;
    }
}

