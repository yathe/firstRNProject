import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Image,
    Keyboard
} from "react-native";

export default class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            data: [],
            // flag: null,
        };
        this.search = this.search.bind(this);// 生命周期以外的方法要绑定
    }

    search() {
        const { text } = this.state;
        Keyboard.dismiss();
        // clearTimeout(this.state.flag)
        //     this.setState({
        //         setTimeout(() => {
                    fetch(`https://api.douban.com/v2/movie/search?q=${text}&apikey=0b2bdeda43b5688921839c8ecb20399b&client=something`)
                        .then(res => res.json())
                        .then(data => {
                            this.props.getSearchWord(data)// 传递值都是通过this.props进行，getSearchWord是父组件中定义的方法，子组件传递data给父组件
                        });
                // },1500)
            // });

    }

    render() {
        // const {navigate} = this.props.navigation;
        const {data, text} = this.state;
        return (
            <View style={styles.bgView}>
                <Image
                    style={styles.searchImg}
                    source={require('./pictures/search.png')}
                />
                <TextInput style={styles.searchText}
                           onChangeText={(text) => this.setState({text})}
                           onSubmitEditing={this.search}
                           placeholder='请输入搜索条件'
                />
            </View>
        );
    }
}

const styles  = StyleSheet.create({
    bgView: {//外层的搜索框
        // flex:1, //错误效果
        height: 40,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        backgroundColor:'#E6E7E8',
        borderRadius:8,
    },
    searchImg: {// 搜索图标
        width: 25,
        height: 25,
        marginLeft: 10,
        // paddingLeft:10,//无效
    },
    searchText: {//搜索框
        flex: 1,//搜索框可以平铺完剩下的宽度
        marginLeft:10,//相对searchImg的距离【子控件间的相对距离】
        paddingRight: 10,//距外层搜索框的右距离
        paddingTop:10,
        paddingBottom:10,
    },
});