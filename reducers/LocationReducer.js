
import * as types from '../actions/ActionType';
const initialState = [
    {isOne:true, title: '定位'},
    {title: '北京'},
    {title: '上海'},
    {title: '苏州'},
    {title: '郑州'},
    {title: '西安'},
    {title: '南京'},
    {title: '昆明'},
    {title: '赤峰'},
    {title: '随州'},
    {title: '邵阳'},
    {title: '临沂'},
    {title: '拉萨'},
    {title: '呼和浩特'},
    {title: '成都'},
    {title: '深圳'},
    {title: '广州'},
    {title: '厦门'},
    {title: '福州'},
    {title: '天津'},
    {title: '丽江'},
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
                {   ...state[0],
                    title: action.title,
                    isOne: false,
                },
                ...state.slice(1)
            ];
        case types.UPDATETOSELECTED:
            if(index > -1) {
                return [
                    ...state.slice(0, index),
                    {
                        ...state[index],
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
                        ...state[index],
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