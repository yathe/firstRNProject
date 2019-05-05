/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

var dimensions = require('Dimensions');//屏幕信息
var {screenWidth, screenHeight} = dimensions.get('window');//获取屏幕的宽和高

export default class LoginPage extends Component<Props> {
  render() {
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
          <View style={styles.container}>
            <Image
                style={styles.circleImg}
                source={require('./pic.png')}
            />
            {/*头像*/}
            <TextInput
                style={styles.textInput}
                placeholder="请输入用户名"
            />
            {/*用户名*/}
            <TextInput
                style={styles.textInput}
                placeholder="请输入密码"
                secureTextEntry={true}
            />
            {/*密码*/}
            <TouchableOpacity
                style={styles.button}
            >
              <Text style={styles.loginText}>登录</Text>
            </TouchableOpacity>
            {/*登录按键*/}
            <View style={styles.canNot}>
              <Text style={{color:'#4398ff'}}>
                无法登录
              </Text>
              <Text style={{color:'#4398ff'}}>
                新用户
              </Text>
            </View>
          </View>
        </SafeAreaView>
    );
  }
}

//声明样式
const styles=StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',// 主轴方向是垂直的
    backgroundColor:'#f5fcff',
    // alignItems:'center',
  },
  circleImg:{
    // justifyContent:'center',
    alignSelf:'center',
    width:100,
    height:100,
    borderColor:'white',
    borderWidth:1,
    borderRadius:50,
    marginTop: 80,
    marginBottom:35
  },
  textInput:{
    marginTop:10,
    height: 40,
    marginLeft:0,
    marginRight:0,
    textAlign: 'center',
    backgroundColor: 'white'
  },
  button:{
    borderRadius:5,
    marginTop:15,
    height:40,
    marginLeft:10,
    marginRight:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#4398ff',//按键的背景色

  },
  loginText:{
    fontSize:18,
    textAlign: 'center',
    color:'white',
    textAlignVertical: 'center'//垂直居中
  },
  canNot:{
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    textAlign:'center',
    color:'#4398ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'//主轴两端对齐
  }
});

