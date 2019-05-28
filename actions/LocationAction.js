
import * as types from "./ActionType";

export function updateLocation(title) {
    return {
        type: types.UPDATELOCATION,
        title,
    }
}

export function updateToSelected(title) {
    return {
        type: types.UPDATETOSELECTED,
        title,
    }
}

export function updateToUnSelected(title) {
    return {
        type: types.UPDATETOUNSELECTED,
        title,
    }
}

