/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createStackNavigator,
        createBottomTabNavigator,
        createAppContainer
        } from "react-navigation";
import React,{Component} from 'react';
import {Image} from 'react-native';
import FirstPage from './FirstPage';
import LoginPage from './LoginPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';

const AppBottomNavigator=createBottomTabNavigator({
  FirstPage:{
    screen:FirstPage,
    navigationOptions: {
      title:'首页',
      tabBarLabel: '首页',
      tabBarIcon: ({tintColor, focused}) => {
        return <Image
            source={require('./pictures/ic_sheet_tab.png')}//自定义图片
            style={{width:26,height:26, tintColor: tintColor}}//选中后颜色变成tintcolor
        />
      }
    }
  },
  SecondPage:{
    screen:SecondPage,
    navigationOptions:{
      title:'发现',
      tabBarLabel:'发现',
      tabBarIcon:({tintColor,focused})=>{
        return <Image
              source={require('./pictures/ic_tab_document.png')}//自定义图片
              style={{width: 26,height:26,tintColor:tintColor}}//选中后颜色变成tintcolor
          />
      }
    }
  },
  ThirdPage:{
      screen:ThirdPage,
      navigationOptions:{
        title :'我的',
        tabBarLabel:'我的',
        tabBarIcon:({tintColor, focused})=>{
          return <Image
                  source={require('./pictures/ic_tab_me.png')}
                  style={{width:26,height:26,tintColor:tintColor}}
          />
        }
      }
  },
},{
  tabBarOptions:{
    activeTintColor:'#e36784'
  }
});

AppBottomNavigator.navigationOptions=({navigation})=>{//可以对具体页的导航栏标题进行修改
  let {routeName} = navigation.state.routes[navigation.state.index];
  if (routeName ==='FirstPage'){
    return {
      headerTitle:'首页'
    // header:null
    }

  } else if (routeName==='SecondPage'){
    return {
      headerTitle:'发现'
    }
  } else if (routeName === 'ThirdPage'){
    return {
      headerTitle:'我的'
    }
  }
};

export const AppStackNavigator=createStackNavigator({
  LoginPage:{
    screen:LoginPage
  },
  FirstPage:{
    screen:FirstPage,
    navigationOptions:({navigation})=>({
      // title: 'FirstPage',
      header:null
    }),

  },
  SecondPage:{
    screen:SecondPage,
    navigationOptions:({navigation})=>({
      title:'SecondPage'
    }),
  },
  ThirdPage:{
    screen:ThirdPage,
    navigationOptions:({navigation})=>({
      title:'Third'
    })
  },
  Bottom:{
    screen:AppBottomNavigator,
    navigationOptions:{
      title:'hh',
      // header:null,
      headerLeft:null,//隐藏左侧返回按键,bottom也要写
    }
  },

});
