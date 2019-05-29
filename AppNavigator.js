/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,// 一次只显示一个页面，默认情况下不做返回处理
    createAppContainer,
} from "react-navigation";
import React, {Component} from 'react';
import {Image} from 'react-native';
import FirstPage from './container/FirstPage';
import LoginPage from './container/LoginPage';
import SecondPage from './container/SecondPage';
import ThirdPage from './container/ThirdPage';
import DetailPage from './container/DetailPage';
import Weather from './container/weather/Weather';
import WeatherDetail from './container/weather/WeatherDetail';
import AddCity from './container/weather/CityList';
import SearchCity from './container/weather/SearchCity';
import {Provider, connect} from "react-redux";
import store from './store/CityStore';

const AppBottomNavigator = createBottomTabNavigator({
    FirstPage: {
        screen: FirstPage,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor, focused}) => {
                return  <Image
                    source={require('./pictures/ic_sheet_tab.png')}//自定义图片
                    style={{width:26,height:26, tintColor: tintColor}}//选中后颜色变成tintcolor
                />
            }
        }
    },
    SecondPage: {
        screen: DetailPage,
        // screen: SecondPage,
        navigationOptions: {
            tabBarLabel: '发现',
            tabBarIcon: ({tintColor,focused}) => {
                return <Image
                    source={require('./pictures/ic_tab_document.png')}//自定义图片
                    style={{width: 26,height:26,tintColor:tintColor}}//选中后颜色变成tintcolor
                />
            }
        }
    },
    ThirdPage: {
        screen: ThirdPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => {
                return <Image
                    source={require('./pictures/ic_tab_me.png')}
                    style={{width:26,height:26,tintColor:tintColor}}
                />
            }
        }
    },ForthPage: {
        screen: Weather,
        navigationOptions: {
            header: null,
            tabBarLabel: '天气',
            tabBarIcon: ({tintColor, focused}) => {
                return <Image
                    source={require('./pictures/ic_tab_me.png')}
                    style={{width:26,height:26,tintColor:tintColor}}
                />
            }
        }
    },
  },{
      tabBarOptions: {
          activeTintColor: '#e36784'
      }
});

AppBottomNavigator.navigationOptions = ({navigation}) => {//可以对具体页的导航栏标题进行修改
    let {routeName} = navigation.state.routes[navigation.state.index];
    if (routeName === 'FirstPage') {
        return {
            headerTitle: '首页'
        }
    } else if (routeName === 'SecondPage') {
        return {
            headerTitle: '发现'
        }
    } else if (routeName === 'ThirdPage') {
        return {
            headerTitle: '我的'
        }
    } else if (routeName === 'ForthPage') {
        return {
            header: null,
        }
    }
};

const AuthStackNavigator = createStackNavigator({
    LoginPage: {
        screen: LoginPage,
        navigationOptions: {
            gesturesEnabled: false,
            header: null,//隐藏导航栏
        },
    },
});

const AppStackNavigator = createStackNavigator({
    Bottom: {
        screen: AppBottomNavigator,
    },
    WeatherDetail: {
        screen: WeatherDetail,
    },
    AddCity: {
        screen: AddCity,
    },
    SearchCity: {
        screen: SearchCity,
    },
});

const APPSwitch = createSwitchNavigator({
    Auth: {
        screen: AuthStackNavigator,
    },
    APP: {
        screen: AppStackNavigator,
    },
    initialRouteName: 'Auth',
});

let AppStackNavigatorContainer = createAppContainer(APPSwitch);
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppStackNavigatorContainer/>
            </Provider>
        )
    }
}
