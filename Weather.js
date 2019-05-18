import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    SafeAreaView,
    SectionList,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    NativeModules
} from 'react-native';
import {Header} from "react-navigation";
import AddCity from './AddCity';
import WeatherDetail from './WeatherDetail';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';


let navigationHeight = Header.HEIGHT; // 获取导航栏高度
let dimensions = require('Dimensions');//屏幕信息
let {screenWidth, screenHeight} = dimensions.get('window');//获取屏幕的宽和高
export default class Weather extends Component<Props>{
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
        }
    }

    // fetchData = () => {
    //     URL = `wthrcdn.etouch.cn/WeatherApi?city=武汉`;
    //     let array = [];
    //     fetch(URL)
    //         .then((response) => response.json())
    //         .then((responseData) => {
    //             this.setState({
    //                 loaded: true,
    //             })
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    //     return array;
    // }
    //
    // async componentDidMount() {
    //     try {
    //         const json = await this.fetchData();
    //         this.setState({
    //
    //         })
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }


    render() {
        // if (!this.state.loaded) {
        //     return (
        //             <View style={styles.container}>
        //                 <ActivityIndicator/>
        //             </View>
        //         )
        // }
        const {navigation} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    {/*地点*/}
                    <View style={{marginLeft: 15, marginTop: 15}}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('AddCity')
                        }}>
                            <Text style={styles.fontSmall}>+ 武汉市</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.temperature}>

                        <Text style={{color: 'white', fontSize: 65, marginLeft: 15}}>
                            22°
                        </Text>

                        <Text style={{color: 'white', fontSize: 20, marginLeft: 5, marginTop: 15}}>
                            多云
                        </Text>

                        <View style={styles.situation}>
                            <View style={{backgroundColor: '#ffff8f', marginLeft: 8, width: 2}}>
                            </View>
                            <Text style={{color: 'white', fontSize: 18, marginLeft: 5}}>
                                良 68
                            </Text>
                        </View>
                    </View>
                    <View style={styles.wind}>
                        <Text style={{color: 'white', fontSize: 18}}>西风1级  湿度92% ></Text>
                    </View>

                    <View style={styles.bottomView}>
                        <TouchableOpacity style={{flex: 1,flexDirection: 'row'}}
                            onPress={() => {
                                navigation.navigate('WeatherDetail')
                        }}>
                            <View style={{flex: 2, flexDirection: 'column'}}>
                                <Text style={{fontSize: 18, color: 'white'}}>今晚</Text>
                                <Text style={{marginTop: 10, fontSize: 18, color: 'white'}}>最低19°C</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>小雨</Text>
                                <View style={{backgroundColor: '#ffffff',
                                    marginTop: 10,
                                    cornerRadius: 8,
                                    paddingTop: 2,
                                    paddingBottom: 2,
                                    paddingRight: 15,
                                    paddingLeft: 15}}>
                                    <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>良</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{backgroundColor: 'white', marginLeft: 10, width: 1}}>
                        </View>
                        <TouchableOpacity style={{flex: 1,flexDirection: 'row'}}
                            onPress={() => {
                            // navigation.navigate('WeatherDetail', {
                            //     title: '武汉市'
                            // })
                                navigation.navigate('WeatherDetail')
                        }}>
                            <View style={{flex: 2, flexDirection: 'column',marginLeft: 10,}}>
                                <Text style={{ fontSize: 18, color: 'white'}}>明天</Text>
                                <Text style={{marginTop: 10, fontSize: 18, color: 'white'}}>27/19°C</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>多云</Text>
                                <View style={{backgroundColor: '#ffffff',
                                    marginTop: 10,
                                    cornerRadius: 8,
                                    paddingTop: 2,
                                    paddingBottom: 2,
                                    paddingRight: 15,
                                    paddingLeft: 15}}>
                                    <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>良</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
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
        backgroundColor: '#00000f',
    },
    temperature: {
        flexDirection: 'row',
        marginTop: 10
    },
    font: {
        color: 'white',
        fontSize: 18,
    },
    fontSmall: {
        color: 'white',
        fontSize: 18,
    },
    situation: {
        flexDirection: 'row',
        backgroundColor: 'rgba(169, 169, 169, 0.6)',
        position: 'absolute',
        right: 0,
        marginTop: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 30,
    },
    wind: {
        marginTop: 10,
        backgroundColor: 'rgba(169, 169, 169, 0.6)',
        marginLeft: 15,
        width:'60%',
        padding: 10,
    },
    bottomView: {
        borderRadius: 8,
        backgroundColor: 'rgba(169, 169, 169, 0.6)',
        // opacity: 0.6,// 会导致子view也有这个透明度
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        position: 'absolute',
        bottom: 0,
    },



})