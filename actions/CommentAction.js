
import * as types from './ActionType';

export function addComment(time, comment) {
    return {
        type: types.ADDCOMMENT,
        time,
        comment,
    }
}

export function updateItemLikeNum(id) {
    return {
        type: types.UPDATEITEMLIKENUM,
        id,
    }
}

export function deleteComment(id) {
    return {
        type: types.DELETECOMMENT,
        id,
    }
}

export function updateLikeNum() {
    return {
        type: types.UPDATELIKENUM,
    }
}

export function addTransmitNum () {
    return {
        type: types.ADDTRANSMITNUM,
    }
}