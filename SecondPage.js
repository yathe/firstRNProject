

import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Text,
    TextInput,
} from 'react-native';

export default class SecondPage extends Component<Props>{
    static navigationOptions ={
        headerLeft:null,//隐藏左侧返回按键
    };
    _flatList;
    _renderItem=(item)=>{//渲染数据
      return (
          <TouchableOpacity style={styles.itemView}>
              <Image
                    source={require('./pictures/bawei.png')}
                    style={styles.itemImg}
              />
              <View style={styles.itemTextView}>
                  <Text style={styles.itemText}>
                      {item.item.title}
                  </Text>
                  <Text style={styles.itemDetail}>
                      {item.item.detail}
                  </Text>
              </View>
          </TouchableOpacity>
      )
    };

    _separator=()=>{//分隔线
        return <View style={{height:1,backgroundColor:'gray'}}>
                </View>
    };
    render(){
        var data = [// 数据源
            {
                title:'Tom',
                detail:'2018.2.3'
            },{
                title:'Mike',
                detail:'2018.3.3'
            },{
                title:'Tony',
                detail:'2018.1.3'
            },
            {
                title:'Andy',
                detail:'2019.2.3'
            },{
                title:'Frank',
                detail:'2011.2.3'
            },{
                title:'Nancy',
                detail:'2018.2.3'
            },{
                title:'Bruce',
                detail:'2018.10.3'
            },{
                title:'Tom',
                detail:'2018.12.3'
            },{
                title:'Ann',
                detail:'2018.2.3'
            }
        ];
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
                <View style={styles.container}>
                    <View style={styles.searchBgView}>
                        <Image
                            style={styles.searchImg}
                            source={require('./pictures/tick.png')}
                        />
                        <TextInput
                            style={styles.searchInputText}
                            // style={{marginLeft:10,paddingRight: 50}}// 距父控件右边界的距离用paddingright
                            placeholder='请输入条件'

                        />
                    </View>
                    <View ItemSeperatorComponent={this._separator}/>
                    <View style={{flex:1,marginTop:5}}>
                        {/*//加了flex之后会考虑底部安全距离*/}
                        <FlatList
                            ref = {(flatList)=>this._flatList = flatList}
                            ItemSeparatorComponent={this._separator}
                            renderItem={this._renderItem}
                            data={data}
                            keyExtractor={(item,index)=>index.toString()}
                                // 每个cell一个独一无二的key值，加上toString()后不警告
                        >
                        </FlatList>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor: 'white'
    },
    searchBgView:{//外层的搜索框
        // flex:1, //错误效果
        height:40,
        marginTop:5,
        marginLeft:10,
        marginRight:10,
        flexDirection:'row',
        backgroundColor:'#E6E7E8',
        borderRadius:5,
        alignItems:'center'
    },
    searchImg:{// 搜索图标
        width:30,
        height:30,
        paddingLeft:10,//无效
        marginLeft:5,
        borderRadius: 15,
    },
    searchInputText:{//搜索框
        flex:1,//搜索框可以平铺完剩下的宽度
        marginLeft:10,//相对searchImg的距离【子控件间的相对距离】 用了flex:1之后起作用
        // height:30,
        // marginRight: 10//无效
        paddingRight:10//距外层搜索框的右距离
    },
    itemView:{
        flexDirection: 'row',
        alignItems:'center',
        height:80
    },
    itemImg:{
        width:60,
        height: 60,
        borderRadius:30,
        marginLeft:10,

    },
    itemTextView:{
        marginLeft:10,
        flexDirection:'column',
        alignItems: 'flex-start',
        height:60
    },
    itemText:{
        fontSize:18,
        marginTop:10,
        height:30,
        textAlignVertical: 'center'
    },
    itemDetail:{
        marginTop:5,
        height:30,
        textAlignVertical: 'center'
    }
});