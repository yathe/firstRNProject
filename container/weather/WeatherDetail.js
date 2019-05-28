import React,{Component} from 'react';
import {
    Button,
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../../tool/CustomTabBar';

const imgStore = {
    'yin': require('../../pictures/yin.png'),
    'qing': require('../../pictures/qing.png'),
    'yun': require('../../pictures/yun.png'),
    'yu': require('../../pictures/yu.png')
};
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
            week: [],
        }
    }

    fetchData = () => {
        const url = `https://www.tianqiapi.com/api/?city=${this.props.navigation.state.params.title}`;
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                //请下次记得加声明 总是犯一样的错误
                const arrData = responseData.data;
                const tabNames = arrData.map(({date, week}) => ({
                    date,
                    week
                }));
                this.setState({
                    loaded: true,
                    week: arrData,
                    tabNames: tabNames,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        try {
            this.fetchData();
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        }
        const {navigation} = this.props;

        return(
            <SafeAreaView style={{flex: 1, backgroundColor: '#696969', flexDirection: 'column'}}>
                <ScrollView bounces={false} scrollEventThrottle={1} showsVerticalScrollIndicator={false}>
                    <View style={{flexDirection: 'row', marginTop: 15, justifyContent: 'space-between', paddingRight: 15, paddingLeft: 15}}>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack()
                        }}>
                            <Text style={{fontSize: 17, color: 'white'}}> 返回 </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 17, color: 'white'}}>{this.props.navigation.state.params.title}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                alert('点击了分享')
                            }}
                        >
                            <Text style={{fontSize: 17, color: 'white'}}>分享</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollableTabView
                        style={{marginTop: 10,}}
                        renderTabBar={() => <CustomTabBar dataNames={this.state.tabNames}/>}
                        tabBarUnderlineStyle={{
                            backgroundColor: '#ffffff',
                            height: 2,
                        }}
                        tabBarActiveTextColor='#ffffff'
                        tabBarInactiveTextColor='#959595'
                        tabBarTextStyle={{fontSize: 15,textAlignVertical: 'center'}}
                        locked={false}
                    >
                        {this.state.week.map((x, index) => {
                            return (
                                <View tabLabel={x.date} key={index}>
                                    <View style={styles.detailBgView}>
                                        <Image style={{width: 230, height: 180, marginTop: 20, marginLeft: 20}}
                                            resizeMode='contain'
                                            source={imgStore[x.wea_img]}
                                        />
                                        <View style={styles.detailTemp}>
                                            <Text style={{fontSize: 20, marginTop: 10}}>{x.wea}</Text>
                                            <Text style={{fontSize: 20, marginTop: 10}}>{x.update_time}</Text>
                                        </View>
                                        <View style={styles.detailTemp}>
                                            <Text style={{fontSize: 20, marginTop: 10}}>温度</Text>
                                            <Text style={{fontSize: 20, marginTop: 10}}>{x.tem1}/{x.tem2}</Text>
                                        </View>
                                        <View style={styles.detailTemp}>
                                            <Text style={{fontSize: 20, marginTop: 10}}>风力</Text>
                                            <Text style={{fontSize: 20, marginTop: 10}}>{x.win}</Text>
                                        </View>
                                        <View style={styles.detailTemp}>
                                            <Text style={{fontSize: 20, marginTop: 10}}>空气质量</Text>
                                            <View style={styles.situation}>
                                                <Text style={{fontSize: 20, marginTop: 10}}>{x.air}</Text>
                                                <View style={{borderRadius:5, backgroundColor: '#ffff8f', marginTop: 10, marginLeft: 5,paddingRight: 10,paddingLeft: 10,paddingTop: 2,paddingBottom: 2}}>
                                                    <Text style={{color: 'black', fontSize: 15}}>良</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.detailBgView2}>
                                        {x.index.map((item, index) => <View style={styles.detailTemp} key={index}>
                                            <Text style={{flex:1, fontSize: 20, marginTop: 10}}>{item.title.indexOf('</em>') >= 0 ?'今日寄语': item.title}</Text>
                                            <Text style={{flex:1, fontSize: 20, marginTop: 10, textAlign: 'right'}}>{item.level === null? item.desc: item.level}</Text>
                                        </View>)}
                                    </View>
                                </View>
                            )
                        })}
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
})