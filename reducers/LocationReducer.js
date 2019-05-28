
import * as types from '../actions/ActionType';
const initialState = [
    {isOne:true, title: '定位'},
    {title: '北京市'},
    {title: '上海市'},
    {title: '苏州市'},
    {title: '郑州市'},
    {title: '西安市'},
    {title: '南京市'},
    {title: '昆明市'},
    {title: '赤峰市'},
    {title: '随州市'},
    {title: '邵阳市'},
    {title: '临沂市'},
    {title: '拉萨市'},
    {title: '呼和浩特市'},
    {title: '成都市'},
    {title: '深圳市'},
    {title: '广州市'},
    {title: '厦门市'},
    {title: '福州市'},
    {title: '天津市'},
    {title: '丽江市'}
].map((item, index) => {
    item.id = index;// id是唯一标识符
    item.chosen = false;
    return item;
});

export default function location(state = initialState, action) {
    const index = state.findIndex(item => item.title == action.title);
    switch (action.type) {
        case types.UPDATELOCATION:
            return [
                {
                    title: action.title,
                    isOne: false,
                    id: 0,
                    chosen: false,
                },
                ...state.slice(1)
            ];
        case types.UPDATETOSELECTED:
            if(index > -1) {
                return [
                    ...state.slice(0, index),
                    {
                        title: action.title,
                        id: index,
                        chosen: true
                    },
                    ...state.slice(index + 1)
                ]
            }
            return state;
        case types.UPDATETOUNSELECTED:
            if(index > -1) {
                return [
                    ...state.slice(0, index),
                    {
                        title: action.title,
                        id: index,
                        chosen: false,
                    },
                    ...state.slice(index + 1)
                ]
            }
            return state;
        default:
            return state;
    }
}