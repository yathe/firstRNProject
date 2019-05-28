

import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    SafeAreaView,
    SectionList,
    TouchableOpacity,
    Text,
    NativeModules
} from 'react-native';

var nativeModule = NativeModules.RNMethodTool;// 原生模块

export default class ThirdPage extends Component<Props>{
    static navigationOptions = {
        headerLeft:null,//隐藏左侧返回按键
        title:'我的'
    };
    renderItem = (item) => {//渲染数据，第二个section
      return (
          <TouchableOpacity style={styles.itemView}>
              <Text style={{marginLeft: 15,fontSize: 16}}>
                  {item.item.title}
              </Text>
          </TouchableOpacity>
      )
    };

    renderItem1 = (item) => {//渲染数据，第一个section
        return (
            <TouchableOpacity style={styles.imgView}>
                <Image
                    style={{marginLeft: 15, width: 90, height: 90}}
                    source={require('../pictures/pic.png')}
                />
                <Text style={{marginLeft: 15,fontSize: 18}}>
                    {item.item.title}
                </Text>
            </TouchableOpacity>
        )
    };

    renderItem2 = (item) => {//渲染数据，第三个section
        return (
            <TouchableOpacity style={styles.itemV}
                              onPress={()=>{
                                  nativeModule.doSomething();// 调用原生界面
                              }}

                              // onPress={()=>this.props.navigation.navigate('LoginPage')}
                                // 退出登录，navigate回到起始登录页面
            >
                <Text style={{fontSize: 20}}>
                    {item.item.title}
                </Text>
            </TouchableOpacity>

        )
    };

    sectionItem = (item) => {
        return (
            <View style={{height:30,backgroundColor:'#f7f7f7'}}>
            </View>
        )
    };

    separator = () => {//分隔线
        return (
            <View style={{height:0.2,backgroundColor:'gray'}}>
            </View>
        )
    };

    render() {
        var sections = [// 数据源，因为不同的section有不同的样式，所以在每个数组里分别为renderItem进行赋值
            {key:'0',
                data:[{img:'./pic.png', title:'AD'}],
                renderItem:this.renderItem1
            },{key:'1',
                data:[{title:'我的收藏'},{title:'我的订单'},{title:'个人设置'},{title:'关于'}],
                renderItem:this.renderItem
            },{key:'2',
                data:[{title:'退出登录'}],
                renderItem:this.renderItem2
            }];
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#f7f7f7'}}>
                <View style={styles.container}>
                    <SectionList
                    renderSectionHeader={this.sectionItem}// 每个section的头
                    sections = {sections}
                    ItemSeparatorComponent={this.separator}// 分割线
                    keyExtractor={(item,index)=>index.toString()}
                    >
                    </SectionList>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor: '#f7f7f7'
    },
    imgView:{
        backgroundColor:'white',
        flexDirection: 'row',
        alignItems:'center',
        height:100,
        justifyContent:'flex-start'
    },
    itemView:{
        backgroundColor:'white',
        flexDirection: 'row',
        alignItems:'center',
        height:50,
    },
    itemV:{
        backgroundColor:'white',
        flexDirection: 'row',
        alignItems:'center',
        height:50,
        justifyContent:'center'
    },
});