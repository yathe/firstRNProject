
import * as types from '../actions/ActionType';

const initialState = {
    clickLike: false,
    likeNum: 75,
    transmitNum: 62,
    data: [
    {
        'img': require('../pictures/bawei.png'),
        'personId': '今天吃啥',
        'time': '2小时前',
        'likeCount': 46,
        'comment': '我每天都在喝有无数年历史的H2O,我每天都在喝有无数年历史的H2O,我每天都在喝有无数年历史的H2O,我每天都在喝有无数年历史的H2O',
        'didClickLike': false,
    },
    {
        'img': require('../pictures/candy.png'),
        'personId': '今天吃啥',
        'time': '2小时前',
        'likeCount': 46,
        'comment': '我每天都在喝有无数年历史的H2O',
        'didClickLike': false,
    },
    {
        'img': require('../pictures/icecream.png'),
        'personId': '今天吃啥',
        'time': '2小时前',
        'likeCount': 46,
        'comment': '我每天都在喝有无数年历史的H2O',
        'didClickLike': false,
    },
    {
        'img': require('../pictures/bawei.png'),
        'personId': '今天吃啥',
        'time': '2小时前',
        'likeCount': 46,
        'comment': '我每天都在喝有无数年历史的H2O',
        'didClickLike': false,
    }
].map((x, index) => {
    return {...x, id: index}
})};

export default function comments(state = initialState, action) {
    switch (action.type) {
        case types.ADDCOMMENT:
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        'img': require('../pictures/pic.png'),
                        'personId': 'K',
                        'time': action.time,
                        'likeCount': 0,
                        'comment': action.comment,
                        'didClickLike': false,
                        'id': state.data.length,
                    }
                ]
            };
        case types.UPDATEITEMLIKENUM:
            let item = state.data[action.id];
            return {
                ...state,
                data: [
                    ...state.data.slice(0, action.id),
                    {
                        ...item,
                        didClickLike: !item.didClickLike,
                        likeCount: item.didClickLike ? item.likeCount - 1 : item.likeCount + 1,
                    },
                    ...state.data.slice(action.id + 1)
                ]
            };
        case types.UPDATELIKENUM:
            return {
                ...state,
                clickLike: !state.clickLike,
                likeNum: state.clickLike ? state.likeNum - 1: state.likeNum + 1,
            };
        case types.DELETECOMMENT:
            return {
                ...state,
                data: [
                    ...state.data.slice(0, action.id),
                    ...state.data.slice(action.id + 1)
                ]
            };
        case types.ADDTRANSMITNUM:
            return {
                ...state,
                transmitNum: state.transmitNum + 1,
            };
        default:
            return state;
    }

}