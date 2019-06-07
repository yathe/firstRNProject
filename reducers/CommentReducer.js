
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
        'reply': [
            {replyFromId:3, comment: '哈哈哈我也是', replyToId: 1},
            {replyFromId:2, comment: '哈哈哈我也是', replyToId: 0},
        ]
    },
    {
        'img': require('../pictures/candy.png'),
        'personId': '今天吃啥好呢',
        'time': '2小时前',
        'likeCount': 46,
        'comment': '我每天都在喝有无数年历史的H2O',
        'didClickLike': false,


    },
    {
        'img': require('../pictures/icecream.png'),
        'personId': '想想今天吃啥',
        'time': '2小时前',
        'likeCount': 46,
        'comment': '我每天都在喝有无数年历史的H2O',
        'didClickLike': false,

    },
    {
        'img': require('../pictures/bawei.png'),
        'personId': '我知道今天吃啥了',
        'time': '2小时前',
        'likeCount': 46,
        'comment': '我每天都在喝有无数年历史的H2O',
        'didClickLike': false,

    }
    ].map((x, index) => {
    return {...x, id: index}
    })
};

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
                        'id': state.data.length>=1 ? state.data[state.data.length - 1].id + 1 : 0,
                    }
                ]
            };
        case types.UPDATEITEMLIKENUM:
            const index = state.data.findIndex(({id}) => id === action.id);
            let item = state.data[index];
            return {
                ...state,
                data: [
                    ...state.data.slice(0, index),
                    {
                        ...item,
                        didClickLike: !item.didClickLike,
                        likeCount: item.didClickLike ? item.likeCount - 1 : item.likeCount + 1,
                    },
                    ...state.data.slice(index + 1)
                ]
            };
        case types.UPDATELIKENUM:
            return {
                ...state,
                clickLike: !state.clickLike,
                likeNum: state.clickLike ? state.likeNum - 1: state.likeNum + 1,
            };
        case types.DELETECOMMENT:
            const deleteIndex = state.data.findIndex(({id}) => id === action.id);
            return {
                ...state,
                data: [
                    ...state.data.slice(0, deleteIndex),
                    ...state.data.slice(deleteIndex + 1)
                ]
            };
        case types.ADDTRANSMITNUM:
            return {
                ...state,
                transmitNum: state.transmitNum + 1,
            };

        case types.ADDREPLY:
            const replyToIndex = state.data.findIndex(({id}) => id === action.id);
            let replyItem = state.data[replyToIndex];
            return {
                ...state,
                data: [
                    ...state.data.slice(0, replyToIndex),
                    {
                        ...replyItem,
                        reply: replyItem.reply ? [...replyItem.reply, {comment: action.comment, replyToId: action.index}] :[{comment: action.comment, replyToId: action.index}]
                    },
                    ...state.data.slice(replyToIndex + 1,)
                ]
            };

        default:
            return state;
    }

}