

import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Text,
    Linking,
} from 'react-native';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import SearchInput from './SearchInput';// 导入搜索栏

// var URL = "https://api.douban.com/v2/movie/in_theaters";
// var URL = "https://api.github.com/search/repositories/q=a";

export default class SecondPage extends Component<Props>{
    static navigationOptions = {
        headerLeft:null,//隐藏左侧返回按键
        title:'发现'
    };

    constructor(props) {
        super(props);
        this.state = {// 初始状态
            // data: [],
            loaded: false,
            movies: [],
            comings: [],
        };
        this.fetchData = this.fetchData.bind(this);// 生命周期以外的方法要绑定
        this.getSearchWord = this.getSearchWord.bind(this);// 生命周期以外的方法要绑定
    }

    componentDidMount() {
        this.fetchData("https://api.douban.com/v2/movie/in_theaters");
        this.fetchData2("https://api.douban.com/v2/movie/coming_soon");
    }

    fetchData(URL) {
        fetch(URL)
            .then((response) => response.json())
            .then((responseData) => {
                let arrData = responseData.subjects;
                let i = 0;
                let arrList = [];
                /* 直接赋值的话没有 key 键,就会发出警告,所以为了避免出现警告,应主动在每个项目中添加 key 键 */
                arrData.map(item => {
                    arrList.push({
                        key: i,
                        value: item,
                    });
                    i++;
                });
                const now = this.state;
                this.setState({
                    movies: arrList,
                    loaded: true,
                })
            }).catch((error) => {
                console.error(error);
        });
    };

    fetchData2(URL) {
        fetch(URL)
            .then((response) => response.json())
            .then((responseData) => {
                let arrData = responseData.subjects;
                let i = 0;
                let arrList = [];
                /* 直接赋值的话没有 key 键,就会发出警告,所以为了避免出现警告,应主动在每个项目中添加 key 键 */
                arrData.map(item => {
                    arrList.push({
                        key: i,
                        value: item,
                    });
                    i++;
                });
                const now = this.state;
                this.setState({
                    comings: arrList,
                    loaded: true,
                })
            }).catch((error) => {
            console.error(error);
        });
    };

    getSearchWord(val) {// 子组件传递val值给父组件
        const {movies} = this.state;
        this.setState({
            movies: movies.splice(1,6)
            // movies: val
            }
        );
    }

    renderItem(item) {//渲染数据
        return (
            <TouchableOpacity style={styles.itemView}
                              onPress={() => {// 调用系统浏览器
                                  var url = 'http://baidu.com';
                                  Linking.openURL(url)
                                      .catch((err) => {
                                          console.log('error occurred')
                                      });
                              }}>
                <Image
                    style={styles.itemImg}
                    source={{uri:item.item.value.images.large.replace('webp', 'png')}}
                />
                <View style={styles.itemTextView}>
                    <Text style={styles.itemText}>
                        {item.item.value.title}
                    </Text>
                    <Text style={styles.itemDetail}>
                        导演：{item.item.value.directors[0].name}
                    </Text>
                    <Text style={styles.itemDetail2}>
                        主演：{item.item.value.casts.map((v) => v.name).join('/')}
                    </Text>

                </View>
            </TouchableOpacity>
        );
    }

    separator() {//分隔线
        return <View style={{height:0.2,backgroundColor:'gray'}}>
        </View>
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    loading messages..
                </Text>
            </View>
        );
    }

    render() {
        const {navigate} = this.props.navigation;
        const {movies} = this.state;
        const {comings} = this.state;
        if (!this.state.loaded) {
            return this.renderLoadingView;
        }

        return (
            <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
                <View style={styles.container}>
                    <SearchInput
                        navigation={this.props.navigation}// 通过this.props把属性传给子组件
                        getSearchWord={this.getSearchWord}
                    />
                    {/*// 导入searchInput模块*/}
                    <View ItemSeperatorComponent={this.separator}/>
                    <ScrollableTabView
                        renderTabBar={() => <DefaultTabBar/>}//系统提供
                        tabBarUnderlineStyle={{
                            backgroundColor: '#000',
                            height: 1,
                            width: '45%',
                            marginLeft: 10,
                            marginRight: 10,
                        }}
                        tabBarBackgroundColor='#ffffff'
                        tabBarActiveTextColor='#000'
                        tabBarInactiveTextColor='#959595'
                        tabBarTextStyle={{fontSize: 15, textAlignVertical: 'center'}}
                        locked={false}
                    >
                        {/*几个view就有几个滑动页面*/}
                        <View tabLabel='正在热映'
                            style={{flex:1,marginTop:5}}>
                            {/*//加了flex之后会考虑底部安全距离*/}
                            <FlatList
                                ItemSeparatorComponent={this.separator}
                                data = {movies}
                                renderItem={this.renderItem}
                                handleMethod = {({viewableItems}) => this.handleViewableItemsChanged(viewableItems)}
                                keyExtractor={(item,index)=>index.toString()}
                                    // 每个cell一个独一无二的key值，加上toString()后不警告
                            >
                            </FlatList>
                        </View>
                        <View tabLabel='即将上映'
                            style={{flex:1,marginTop:5}}>
                            {/*//加了flex之后会考虑底部安全距离*/}
                            <FlatList
                                ItemSeparatorComponent={this.separator}
                                data = {comings}
                                renderItem={this.renderItem}
                                handleMethod = {({viewableItems}) => this.handleViewableItemsChanged(viewableItems)}
                                keyExtractor={(item,index)=>index.toString()}
                                // 每个cell一个独一无二的key值，加上toString()后不警告
                            >
                            </FlatList>
                        </View>
                    </ScrollableTabView>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor: 'white',
    },
    itemView:{
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        // alignItems:'center',
        // height:80
    },
    itemImg:{
        minWidth: 70,
        // width: '15%',
        height: 100,
        marginLeft: 10,
        alignSelf: 'center',
    },
    itemTextView:{
        marginLeft:15,
        // paddingRight:10,
        width: '70%',
        flexDirection:'column',// 主轴布局
        alignItems: 'flex-start',// 次轴布局
        // height:60
    },
    itemText:{
        fontSize: 19,
        // width: '80%',
        // position: 'relative',
        // right: 10,
        // margin:10,
        paddingRight:15,
        // flex:1,
        // numberOfLines:3,
        // height:30,
        // textAlignVertical: 'center'
    },
    itemDetail:{
        marginTop:15,
        // height:30,
        // textAlignVertical: 'center'
    },
    itemDetail2:{
        marginTop:5,
        // height:30,
        // textAlignVertical: 'center'
    },
});