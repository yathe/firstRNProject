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
} from 'react-native';

var dimensions = require('Dimensions');//屏幕信息
var {screenWidth, screenHeight} = dimensions.get('window');//获取屏幕的宽和高

export default class LoginPage extends Component<Props> {
  static navigationOptions={
    header:null,//隐藏导航栏
  };
  render() {
    const {navigation}=this.props;
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#f5fcff'}}>
          <View style={styles.container}>
            <Image
                style={styles.circleImg}
                source={require('./pictures/pic.png')}
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
                onPress={()=>{
                  navigation.navigate('Bottom')
                }}
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
            <View style={styles.share}>
              <Text style={styles.shareText}>
                其他登录方式：
              </Text>
              <Image
                style={styles.shareImg}
                source={require('./pictures/wechat.png')}
              />
              <Image
                style={styles.shareImg}
                source={require('./pictures/alipay.png')}
              />
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
    backgroundColor: 'white',
    borderColor: 'gray',
    fontSize:16
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
  },
  share:{
    alignItems:'center',//内部控件垂直方向居中
    position:'absolute',//绝对定位
    left:0,
    bottom:20,
    justifyContent:'flex-start',
    height:60,
    flexDirection:'row'//内部控件水平排列
  },
  shareText:{
    fontSize:15,
    color:'gray',
    marginLeft:10,
  },
  shareImg:{
    width: 50,
    height:50,
    borderRadius:25,
    marginLeft:10
  }
});

