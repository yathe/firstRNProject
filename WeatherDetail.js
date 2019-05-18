import React,{Component} from 'react';
import {
    Button,
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';


let dimensions = require('Dimensions');
let {screenWidth, screenHeight} = dimensions.get('window');
export default class WeatherDetail extends Component<Props> {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            temperature: '',
            states: '',
            wind: '',
            valuation: '',
            forecast: '',
            tomorrow: '',
            week: [],
        }
    }

    changeData = (i) => {

    }

    render() {
        const {navigation} = this.props;
        let days = [];
        let date = new Date();
        for (let i = -1;i < 5;i++) {
            let nowDate = new Date(date.getFullYear(), date.getMonth(),date.getDate() + i);
            let month = (nowDate.getMonth() + 1).toString();
            let day = nowDate.getDate().toString();
            let str = month+'/'+day;
            days.push(str)
        }
        return(
            <SafeAreaView style={{flex: 1, backgroundColor: '#696969', flexDirection: 'column'}}>
                <ScrollView
                    bounces={false} scrollEventThrottle={1}>
                    <View style={{flexDirection: 'row', marginTop: 15, justifyContent: 'space-between', paddingRight: 15, paddingLeft: 15}}>
                        <TouchableOpacity
                            onPress={() => {
                            navigation.goBack()
                        }}>
                            <Text style={{fontSize: 17, color: 'white'}}> 返回 </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 17, color: 'white'}}>武汉市</Text>
                        <TouchableOpacity
                            onPress={() => {
                            alert('点击了分享')
                        }}>
                            <Text style={{fontSize: 17, color: 'white'}}>分享</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollableTabView
                        style={{marginTop: 10,}}
                        renderTabBar={() => <DefaultTabBar/>}
                        tabBarUnderlineStyle={{
                            backgroundColor: '#ffffff',
                            height: 2,
                            // width: '45%',
                            // marginLeft: 10,
                            // marginRight: 10,
                        }}
                        // tabBarBackgroundColor='#f3f3f3'
                        tabBarActiveTextColor='#ffffff'
                        tabBarInactiveTextColor='#959595'
                        tabBarTextStyle={{fontSize: 15,textAlignVertical: 'center'}}
                        locked={false}
                        onChangeTab={(i) => this.changeData(i)}
                    >
                        {/*days.map((key) => {*/}
                        {/*<View tabLabel={`${key}`}>*/}
                        <View tabLabel='05/19'>
                            <View style={styles.detailBgView}>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>多云转小雨</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>日常05：28</Text>
                                </View>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>温度</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>24/19°C</Text>
                                </View>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>风力</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>东风转北风</Text>
                                </View>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>空气质量</Text>
                                    <View style={styles.situation}>
                                        <Text style={{fontSize: 20, marginTop: 10}}>72</Text>
                                        <View style={{borderRadius:5, backgroundColor: '#ffff8f', marginTop: 10, marginLeft: 5,paddingRight: 10,paddingLeft: 10,paddingTop: 2,paddingBottom: 2}}>
                                            <Text style={{color: 'black', fontSize: 15}}>
                                                良
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.detailBgView2}>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>月相</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>更多月相 ></Text>
                                </View>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>盈亏月</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>月落04：24</Text>
                                </View>
                            </View>


                            <View style={styles.calendarView}>
                                <View style={{alignSelf: 'flex-start',marginTop: 20}}>
                                    <Text style={{fontSize: 20}}>黄历</Text>
                                </View>
                                <View style={styles.calendarNextView}>
                                    <View style={{flexDirection: 'row', flex: 3/5}}>
                                        <View>
                                            <Text style={{fontSize: 40, marginTop: 10}}>16</Text>
                                        </View>
                                        <View style={{marginLeft: 10, flexDirection: 'column', justifyContent: 'flex-start'}}>
                                            <Text style={{fontSize: 17, marginTop: 10}}>星期四</Text>
                                            <Text style={{fontSize: 17, marginTop: 10}}>农历己亥年四月十二</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', flex: 2/5}}>
                                        <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
                                            <Text style={{fontSize: 17, marginTop: 10}}>宜 开市 交易</Text>
                                            <Text style={{fontSize: 17, marginTop: 10}}>忌 嫁娶 入宅</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View tabLabel='05/20'>
                            <View style={styles.detailBgView}>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>多云转小雨</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>日常05：28</Text>
                                </View>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>温度</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>24/19°C</Text>
                                </View>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>风力</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>东风转北风</Text>
                                </View>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>空气质量</Text>
                                    <View style={styles.situation}>
                                        <Text style={{fontSize: 20, marginTop: 10}}>72</Text>
                                        <View style={{borderRadius:5, backgroundColor: '#ffff8f', marginTop: 10, marginLeft: 5,paddingRight: 10,paddingLeft: 10,paddingTop: 2,paddingBottom: 2}}>
                                            <Text style={{color: 'black', fontSize: 15}}>
                                                良
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.detailBgView2}>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>月相</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>更多月相 ></Text>
                                </View>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>盈亏月</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>月落04：24</Text>
                                </View>
                            </View>


                            <View style={styles.calendarView}>
                                <View style={{alignSelf: 'flex-start',marginTop: 20}}>
                                    <Text style={{fontSize: 20}}>黄历</Text>
                                </View>
                                <View style={styles.calendarNextView}>
                                    <View style={{flexDirection: 'row', flex: 3/5}}>
                                        <View>
                                            <Text style={{fontSize: 40, marginTop: 10}}>16</Text>
                                        </View>
                                        <View style={{marginLeft: 10, flexDirection: 'column', justifyContent: 'flex-start'}}>
                                            <Text style={{fontSize: 17, marginTop: 10}}>星期四</Text>
                                            <Text style={{fontSize: 17, marginTop: 10}}>农历己亥年四月十二</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', flex: 2/5}}>
                                        <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
                                            <Text style={{fontSize: 17, marginTop: 10}}>宜 开市 交易</Text>
                                            <Text style={{fontSize: 17, marginTop: 10}}>忌 嫁娶 入宅</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View tabLabel='05/21'>
                            <View style={styles.detailBgView}>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>多云转小雨</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>日常05：28</Text>
                                </View>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>温度</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>24/19°C</Text>
                                </View>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>风力</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>东风转北风</Text>
                                </View>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>空气质量</Text>
                                    <View style={styles.situation}>
                                        <Text style={{fontSize: 20, marginTop: 10}}>72</Text>
                                        <View style={{borderRadius:5, backgroundColor: '#ffff8f', marginTop: 10, marginLeft: 5,paddingRight: 10,paddingLeft: 10,paddingTop: 2,paddingBottom: 2}}>
                                            <Text style={{color: 'black', fontSize: 15}}>
                                                良
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.detailBgView2}>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>月相</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>更多月相 ></Text>
                                </View>
                                <View style={styles.detailTemp}>
                                    <Text style={{fontSize: 20, marginTop: 10}}>盈亏月</Text>
                                    <Text style={{fontSize: 20, marginTop: 10}}>月落04：24</Text>
                                </View>
                            </View>


                            <View style={styles.calendarView}>
                                <View style={{alignSelf: 'flex-start',marginTop: 20}}>
                                    <Text style={{fontSize: 20}}>黄历</Text>
                                </View>
                                <View style={styles.calendarNextView}>
                                    <View style={{flexDirection: 'row', flex: 3/5}}>
                                        <View>
                                            <Text style={{fontSize: 40, marginTop: 10}}>16</Text>
                                        </View>
                                        <View style={{marginLeft: 10, flexDirection: 'column', justifyContent: 'flex-start'}}>
                                            <Text style={{fontSize: 17, marginTop: 10}}>星期四</Text>
                                            <Text style={{fontSize: 17, marginTop: 10}}>农历己亥年四月十二</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', flex: 2/5}}>
                                        <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
                                            <Text style={{fontSize: 17, marginTop: 10}}>宜 开市 交易</Text>
                                            <Text style={{fontSize: 17, marginTop: 10}}>忌 嫁娶 入宅</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>


                    </ScrollableTabView>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    detailBgView: {
        flexDirection: 'column',
        backgroundColor: '#808080',
        paddingBottom: 10,
    },
    detailBgView2: {
        flexDirection: 'column',
        backgroundColor: '#dcdcdc',
        paddingBottom: 20,
    },
    detailTemp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 10,
    },
    situation: {
        flexDirection: 'row',
    },
    calendarView: {
        flexDirection: 'column',
        marginTop: 10,
        backgroundColor: '#a9a9a9',
        paddingLeft: 10,
        paddingBottom: 20
    },
    calendarNextView:{
        flexDirection: 'row',
        marginTop: 15,
    },
    calendarChildView: {
        flexDirection: 'row',
        flex:1,
        padding: 10,
    },
})