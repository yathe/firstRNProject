

import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Text,
    Dimensions,
    ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';
const {screenWidth} = Dimensions.get('window');//获取屏幕的宽和高


export default class FirstPage extends Component<Props>{
    static navigationOptions ={
        headerLeft:null,//隐藏左侧返回按键
        title:'首页'
    };
    _flatList;
    _renderItem=(item)=>{
        return(
            <TouchableOpacity style={styles.itemView}>
                <Image
                    source={require('./福字.png')}
                    style={{width:90,height:90,alignItems:'center',marginLeft:10,marginRight:10}}
                />
                <View style={styles.itemDetail}>
                    <Text
                        style={{fontSize:18,marginTop:5}}
                    >{item.item.title}
                    </Text>
                    <Text
                        style={{fontSize:14,color:'gray',marginTop:8}}
                    >{item.item.detail}
                    </Text>
                    <Text
                        style={{fontSize:16,marginTop:8,marginBottom:5}}
                    >{item.item.description}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };

    _seperator=()=>{
      return <View style={{height:0.2,backgroundColor:'gray'}}>
      </View>
    };

    render(){
        var data = [
            {
            title:'福记饮料配送',
                detail:'距您0.72千米',
                description:'配送费¥5.0'
            },{
                title:'诚信粮油',
                detail:'距您2.72千米',
                description:'配送费¥5.0'
            },{
                title:'新竹市场',
                detail:'距您2.23千米',
                description:'配送费¥5.0'
            },{
                title:'新城粮油干货食材',
                detail:'距您0.72千米',
                description:'配送费¥0.0'
            },{
                title:'兴业酒店',
                detail:'距您5.72千米',
                description:'配送费¥2.0'
            },
        ];


        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#f7f7f7'}}>
                <ScrollView
                    horizontal={false}//垂直滚动
                    removeClippedSubviews={true}
                    showsVerticalScrollIndicator={false}
                >
                {/*//轮播图*/}
                <Swiper
                    style={styles.wrapper}
                    showsButton={true}
                    activeDot={<View style={{//修改选中的点的样式
                        backgroundColor: 'white',
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3
                    }}/>}
                    paginationStyle={{bottom:1}}>
                    <Image
                        style={styles.slider1}
                        source={require('./ad1.jpg')}
                    />
                    <Image
                        style={styles.slider1}
                        source={require('./ad5.jpg')}
                    />
                    <Image
                        style={styles.slider1}
                        source={require('./ad6.jpg')}
                    />
                </Swiper>

                <View style={styles.typeView}>
                    <View style={styles.typeChildView}>
                    <Image
                        style={styles.typeImg}
                        source={require('./icon_dishware.png')}
                    />
                    <Text style={styles.typeText}>
                        粮油
                    </Text>
                    </View>
                    <View style={styles.typeChildView}>
                    <Image
                        style={styles.typeImg}
                        source={require('./icon_drink.png')}
                    />
                    <Text style={styles.typeText}>
                        蔬菜
                    </Text>
                    </View>
                    <View style={styles.typeChildView}>
                    <Image
                        style={styles.typeImg}
                        source={require('./icon_vegetables.png')}
                    />
                    <Text style={styles.typeText}>
                        调料干货
                    </Text>
                    </View>
                    <View style={styles.typeChildView}>
                    <Image
                        style={styles.typeImg}
                        source={require('./icon_egg.png')}
                    />
                    <Text style={styles.typeText}>
                        肉禽蛋
                    </Text>
                    </View>
                    <View style={styles.typeChildView}>
                    <Image
                        style={styles.typeImg}
                        source={require('./icon_fish.png')}
                    />
                    <Text style={styles.typeText}>
                        水冻产品
                    </Text>
                    </View>
                    <View style={styles.typeChildView}>
                    <Image
                        style={styles.typeImg}
                        source={require('./icon_fruit.png')}
                    />
                    <Text style={styles.typeText}>
                        餐具饮料
                    </Text>
                    </View>
                    <View style={styles.typeChildView}>
                    <Image
                        style={styles.typeImg}
                        source={require('./icon_grain-and-oil.png')}
                    />
                    <Text style={styles.typeText}>
                        酒水饮料
                    </Text>
                    </View>
                    <View style={styles.typeChildView}>
                    <Image
                        style={styles.typeImg}
                        source={require('./icon_seasoning.png')}
                    />
                    <Text style={styles.typeText}>
                        水果
                    </Text>
                    </View>
                </View>
                    <View style={styles.activityView}>
                        <Image
                            style={{ width:50,height:50,marginTop:10}}
                            source={require('./pic_banner.png')}
                        />
                        <View style={styles.activityDetailView}>
                            <Text style={{fontSize:18,marginLeft:10,marginTop:10}}>
                                特价活动
                            </Text>
                            <Text style={{fontSize:14,marginLeft:10,color:'gray',marginTop:5}}>
                                爆款、全市最低价
                            </Text>
                        </View>
                        <Image
                            style={{marginLeft:20,width:50,height:50,marginTop:10}}
                            source={require('./pic_bann.png')}
                        />
                        <View style={styles.activityDetailView}>
                            <Text style={{fontSize:18,marginLeft:10,marginTop:10}}>
                                免配送费
                            </Text>
                            <Text style={{fontSize:14,marginLeft:10,color:'gray',marginTop:5}}>
                                免费送菜啦
                            </Text>
                        </View>

                    </View>
                    <View style={{flex:1,marginTop: 20,backgroundColor:'white'}}>
                        <FlatList
                            ref = {(flatList)=>this._flatList = flatList}
                            ItemSeparatorComponent={this._seperator}
                            renderItem={this._renderItem}
                            data={data}
                            keyExtractor={(item,index)=>index.toString()}
                        >
                        </FlatList>
                    </View>

            </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{
        width:screenWidth,
        height:160
    },

    slider1:{
        width:screenWidth,
        height:160
    },
    typeView:{
        backgroundColor:'white',
        width:screenWidth,
        height:200,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between'
    },
    typeChildView:{
        width: Dimensions.get('window').width*0.25,
        height:80,
        marginTop:8,
        flexDirection:'column',
        justifyContent:'center'
    },
    typeImg:{
        width: 60,
        marginTop: 10,
        height: 60,
        alignSelf:'center'
    },
    typeText:{
        height:20,
        marginTop: 5,
        textAlign: 'center'
    },
    activityView:{
        marginTop:20,
        backgroundColor:'white',
        height:70,
        flexDirection:'row',
        // alignItems: 'center'
    },
    activityDetailView:{
        backgroundColor:'white',
        marginTop:5,
        height:50,
        flexDirection:'column',
        alignItems:'flex-start',
    },
    itemView:{

        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        height:100
    },
    itemDetailView:{
        flexDirection:'column',
        justifyContent:'flex-start',
    }



});