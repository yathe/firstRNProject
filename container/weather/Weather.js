import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
} from 'react-native';
import AddCity from './CityList';
import WeatherDetail from './WeatherDetail';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {updateCity} from "../../actions/CityAction";
import {connect} from 'react-redux';

const imgStore = {
    'yin': require('../../pictures/yin.png'),
    'qing': require('../../pictures/qing.png'),
    'yun': require('../../pictures/yun.png'),
    'yu': require('../../pictures/yu.png')
};
let dimensions = require('Dimensions');//屏幕信息
let {screenWidth, screenHeight} = dimensions.get('window');//获取屏幕的宽和高

class Weather extends Component<Props>{
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
            img: '',
            forecast: '',
            tomorrow: '',
            city: this.props.city[0].title,
            airTips: '',
            refreshTime: '',
            isRefreshing: false,
        };
    }

    fetchData = (title) => {
        const url = `https://www.tianqiapi.com/api/?version=v6&city=${title}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    city: title,
                    temperature: responseData.tem,
                    states: responseData.wea,
                    wind: responseData.win+responseData.win_speed+'  湿度'+responseData.humidity+' >',
                    valuation: responseData.air_level+'  '+responseData.air,
                    img: responseData.wea_img,
                    airTips: responseData.air_tips,
                    refreshTime: responseData.update_time,
                });
                this.props.city.map((it) => {
                    if(it.title === title) {
                        this.props.updateCityByTitle(title, responseData.tem+'°C')
                    }
                });
            })
            .then(() => {
                this.fetchForecast(title);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    fetchForecast = (title) => {
        const url = `http://www.tianqiapi.com/api/?city=${title}`;
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                const data = responseData.data;
                this.setState({
                    forecastArr: data
                });
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }

    componentDidMount() {
        try {
            this.fetchData(this.state.city);
            this.fetchForecast(this.state.city);
            this.setState({
                loaded: true,
            })
        } catch (e) {
            console.error(e);
        }
    }

    refreshData = () => {
        try {
            this.setState({
                isRefreshing: true,
            });
            setTimeout(() => {
                this.fetchData(this.state.city);
                this.setState({
                    isRefreshing: false,
                })
            }, 1000);
        } catch (e) {
            console.error(e);
        }
    }

    // 左滑右滑切换
    changeData = (index) => {
        try {
            let type = this.props.city[index].title;
            this.fetchData(type);
        } catch (e) {
            console.error(e);
        }
    }

    // 选中另一个城市
    changeCity = (title) => {
        // this.setState({
        //     data:this.props.city,
        // });
        // alert(title);
        this.fetchData(title);
        // hhhhhhhh 林思辰 欠我一顿饭，在此证明。立字为据。
        // jide a kewude linsichen
    }


    render() {
        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator style={{marginVertical: 30}}/>
                </View>
            )
        }
        const {navigation, city} = this.props;

        // 确定城市名对应的页码
        const cityIndex = city.findIndex(({title}) => title === this.state.city);
        const {forecastArr} = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollableTabView horizontal={true}
                    showsPagination={false}
                    style={{marginTop: 10, }}
                    page={cityIndex || 0}
                    // 确定城市名对应的页码
                    onChangeTab={({i}) => {this.changeData(i)}}
                    renderTabBar={() => <View />}
                    // 可以隐藏头部tabbar
                >
                    {city.map((item, index) => {
                        return (
                            <View style={styles.container}
                                key={index}
                            >
                                <ScrollView style={styles.container}
                                    showsVerticalScrollIndicator={false}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.isRefreshing}
                                            onRefresh={this.refreshData}
                                        />
                                    }
                                    scrollEventThrottle={50}
                                >
                                        {/*地点*/}
                                    <View style={{marginLeft: 15, marginTop: 15}}>
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('AddCity',{
                                                // dataArr: this.state.data,
                                                changeCity: this.changeCity
                                            })
                                        }}>
                                            <Text style={styles.fontSmall}>+ {item.title}市</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.temperature}>
                                        <Text style={{color: 'white', fontSize: 65, marginLeft: 15}}>
                                            {this.state.temperature}°
                                        </Text>
                                        <Text style={{color: 'white', fontSize: 20, marginLeft: 5, marginTop: 15}}>
                                            {this.state.states}
                                        </Text>
                                        <View style={styles.situation}>
                                            <View style={{backgroundColor: '#ffff8f', marginLeft: 8, width: 2}}>
                                            </View>
                                                <Text style={{color: 'white', fontSize: 18, marginLeft: 5}}>
                                                    {this.state.valuation}
                                                </Text>
                                            </View>
                                        </View>
                                    <View style={styles.wind}>
                                        <Text style={{color: 'white', fontSize: 18}}>{this.state.wind}</Text>
                                    </View>
                                    <Image style={{marginLeft: 30, width:210, height: 180, marginTop: 30}}
                                        resizeMode='contain'
                                        source={imgStore[this.state.img]}/>
                                    <View style={{padding: 15, marginTop: 15}}>
                                        <Text style={{color: 'lightgray', fontSize: 18}}>
                                            {this.state.airTips}
                                        </Text>
                                    </View>
                                    <View style={{marginRight: 20, height: 40, padding: 10}}>
                                        <Text style={{color: 'lightgray', fontSize: 18, textAlign: 'right'}}>更新于：{this.state.refreshTime}</Text>
                                    </View>
                                </ScrollView>

                                <View style={styles.bottomView}>
                                    <TouchableOpacity style={{flex: 1,flexDirection: 'row'}}
                                        onPress={() => {
                                            navigation.navigate('WeatherDetail', {
                                                title: this.state.city,
                                            })
                                        }}
                                    >

                                        {/*// 判断forecastArr有数据了再取值*/}
                                        <View style={{flex: 2, flexDirection: 'column'}}>
                                            <Text style={{fontSize: 18, color: 'white'}}>{forecastArr && forecastArr[1].hours[0].day}</Text>
                                            <Text style={{marginTop: 10, fontSize: 18, color: 'white'}}>{forecastArr && forecastArr[1].hours[0].tem}</Text>
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'column'}}>
                                            <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>{forecastArr && forecastArr[1].hours[0].wea}</Text>
                                            <View style={{backgroundColor: '#ffffff',
                                                marginTop: 13,
                                                cornerRadius: 8,
                                                paddingTop: 2,
                                                paddingBottom: 2,
                                            }}>
                                                <Text style={{fontSize: 16, color: 'black', textAlign: 'center'}}>{forecastArr && forecastArr[1].hours[0].win}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <View style={{backgroundColor: 'white', marginLeft: 10, width: 1}}>
                                    </View>

                                    <TouchableOpacity style={{flex: 1,flexDirection: 'row'}}
                                        onPress={() => {
                                            navigation.navigate('WeatherDetail', {
                                                title: this.state.city,
                                            })
                                        }}
                                    >
                                        <View style={{flex: 2, flexDirection: 'column',marginLeft: 10,}}>
                                            <Text style={{ fontSize: 18, color: 'white'}}>{forecastArr && forecastArr[1].hours[1].day}</Text>
                                            <Text style={{marginTop: 10, fontSize: 18, color: 'white'}}>{forecastArr && forecastArr[1].hours[1].tem}</Text>
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'column'}}>
                                            <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>{forecastArr && forecastArr[1].hours[1].wea}</Text>
                                            <View style={{backgroundColor: '#ffffff',
                                                marginTop: 13,
                                                cornerRadius: 8,
                                                paddingTop: 2,
                                                paddingBottom: 2,
                                            }}>
                                                <Text style={{fontSize: 16, color: 'black', textAlign: 'center'}}>{forecastArr && forecastArr[1].hours[1].win}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    )})}
                </ScrollableTabView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000000'
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
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
})

const mapStateToProps = state => ({city: state.city})
const mapDispatchToProps = dispatch => ({
    updateCityByTitle: (title, temperature) => {
        dispatch(updateCity(title, temperature))
    }
})

let cityContainer = connect(mapStateToProps, mapDispatchToProps)(Weather);

export default cityContainer