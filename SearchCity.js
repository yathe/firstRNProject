import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    Image
} from "react-native";
import SearchInput from './SearchInput';
import Grid from 'react-native-grid-component';

let dimensions = require('Dimensions');//屏幕信息
let {screenWidth, screenHeight} = dimensions.get('window');//获取屏幕的宽和高

export default class SearchCity extends Component<Props>{
    constructor(props) {
        super(props);
        const data = [
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
            {title: '沈阳市'},
            {title: '武汉市'},
            {title: '天津市'},
            {title: '丽江市'}
        ].map((item, index) => {
            item.id = index;
            item.chosen = false;
            return item;
        });

        this.state = {
            // isClicked: false,
            data,
            activeId: null
        };
    }
    static navigationOptions = ({
        header: null,
    })

    onPressHandler = (itemId) => {
        const data = this.state.data.map((it, index) => {
            if(it.id == itemId) {
                it.chosen = true;
            } else {
                it.chosen = false;
            }
            return it
        });

        this.setState({
            activeId: itemId,
            data
        });
    }

    renderItem = (item) => {

        if (item.isOne) {
            return (
                <TouchableOpacity key={item.id} onPress={() => {
                    this.onPressHandler(item.id)
                    alert('定位')
                }}>
                    <View style={styles.itemView}>
                        <Image
                            source={require('./pictures/location.jpg')}
                            style={{width: 10, height: 18, marginRight: 2}}
                            resizeMode='stretch'// 图片可以铺满
                        />
                        <Text style={{
                                marginTop: 10,
                                marginBottom: 10,
                                alignSelf: 'center',
                                textAlign: 'center',
                                color: 'gray'
                        }}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity key={item.id} onPress={() => {
                this.onPressHandler(item.id)
            }}>
                <View style={styles.itemView}>
                    <Text
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                            alignSelf: 'center',
                            textAlign: 'center',
                            color: item.chosen ? 'green': 'gray'
                        }}
                    >{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // componentWillMount() {


    //     let state = {}

    //     data.forEach((item, index) => {
    //         state[index] = false
    //     });

    //     this.setState({
    //         data,
    //         ...state
    //     })
    // }

    render() {

        // let data = [
        //     '定位',
        //     '北京市',
        //     '上海市',
        //     '苏州市',
        //     '郑州市',
        //     '西安市',
        //     '南京市',
        //     '昆明市',
        //     '赤峰市',
        //     '随州市',
        //     '邵阳市',
        //     '临沂市',
        //     '拉萨市',
        //     '呼和浩特市',
        //     '成都市',
        //     '深圳市',
        //     '广州市',
        //     '沈阳市',
        //     '武汉市',
        //     '天津市',
        //     '丽江市'];
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <View style={{marginTop: 30, marginLeft: 15, marginBottom: 30,}}>
                        <Text style={{color: 'white', fontSize: 20}}>X</Text>
                    </View>
                    <SearchInput style={{marginTop: 80}}/>

                    <View style={styles.addView}>
                        <Text style={{marginTop: 30, marginLeft: 10, fontSize: 20}}>热门城市</Text>
                        <View style={{flex: 1, marginTop: 20}}>
                            <Grid
                                renderItem={this.renderItem}
                                data={this.state.data}
                                itemsPerRow={3}
                                keyExtractor={(item, index)=>index.toString()}
                                itemHasChanged={(it1, it2) => it1.chosen == it2.chosen}
                            >
                            </Grid>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    addView: {
        marginTop: 40,
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray',
        height: 40,
        width:100,
        marginBottom: 20,
    },
})