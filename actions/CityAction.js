
import * as types from './ActionType';

// action创建函数
export function addCity(title, temperature) {
    return {
        type: types.ADDCITY,
        title,
        temperature,
    }
}

export function deleteCity(title) {
    return {
        type: types.DELETECITY,
        title,
    }
}

export function updateCity(title, temperature) {
    return {
        type: types.UPDATECITY,
        title,
        temperature,
    }
}
