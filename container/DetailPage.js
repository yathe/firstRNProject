
import React, {Component} from 'react';
import {Button,
    ScrollView,
    StyleSheet,
    View,
    ActivityIndicator,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import ThirdPage from "./ThirdPage";

const moview = 'https://api.douban.com/v2/movie/subject/26363254?apikey=0b2bdeda43b5688921839c8ecb20399b&city=北京&client=something&udid=dddddddddddddddddddddd/2';
const movieInfo = 'https://api.douban.com/v2/movie/subject';
const {width, height} = Dimensions.get('window');

export default class DetailPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            isExpend:false,
            num: 4,
            data: {},
        }
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: '电影',
        headerRight: <Button title='分享' onPress={() => alert('点击了分享')}/>,
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#2a362c',
            opacity: 1,
        }
    });

    componentDidMount() {
        // const {state:{param:{id}}} = this.props.navigation;
        let formData = new FormData();
        formData.append('apikey','0b2bdeda43b5688921839c8ecb20399b',);
        formData.append('city','北京');
        formData.append('client','something',);
        formData.append('udid','dddddddddddddddddddddd');

        // fetch(`${movieInfo}/${id}`,{
        fetch(moview,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    data: data,
                    ready: true,
                });
            })
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' style={{marginTop: 100}}/>
            </View>
        );
    }

    render() {
        const {
            title,
            year,
            countries,
            genres,
            summary,
            ratings_count,
            mainland_pubdate,
            durations,
            photos,
            images,
            casts,
            rating,
            popular_comments
        } = this.state.data;

        if (!this.state.ready) {
            return this.renderLoadingView;
        }

        return(
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.titleView}>
                    <Image source={images && {uri:images.large}} style={styles.titleImg}/>
                </View>

                <View style={{margin: 20,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <View style={styles.nameView}>
                        <Text style={{fontSize: 22, fontWeight: '600', marginBottom: 5}}>
                            {title}
                        </Text>
                        <Text style={styles.detailText}>{year}/{countries}/{genres}</Text>
                        <Text style={styles.detailText}>上映时间：{mainland_pubdate}({countries})</Text>
                        <Text style={styles.detailText}>片长：{durations}</Text>
                    </View>
                    <View style={styles.scoreView}>
                        <Text style={{marginTop: 10, color: 'gray'}}>豆瓣评分</Text>
                        <Text style={{marginTop: 10, fontSize: 20}}>{rating.average}</Text>
                        <Text style={{marginTop: 10, color: 'gray'}}>{ratings_count}人</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row',
                    justifyContent: 'flex-start'}}>
                    <TouchableOpacity onPress={() => alert('点击购买')}>
                        <Text style={{marginTop: 20,
                            marginBottom: 20,
                            marginLeft: 10,
                            fontSize:18,
                        }}>选座购票</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginLeft: 10, marginRight: 10}}>
                    <Text style={{fontSize: 16, color: 'gray',alignSelf: 'flex-start'}}>简介</Text>
                    <Text style={{fontSize: 16, marginTop: 10}}
                        numberOfLines={this.state.num}>{summary}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        this.setState({isExpend: !this.state.isExpend, num: this.state.isExpend ? 4 : 0})
                    }}>
                        <Text style={{color: "#2CBA48", fontSize: 16}}>
                            {!this.state.isExpend && '展开' || this.state.isExpend && '收起'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginLeft: 10, marginRight: 10, marginTop: 40,}}>
                    <Text style={{fontSize: 16, color: 'gray', alignSelf: 'flex-start'}}>影人</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            casts.map((x, i) => {
                                return(
                                    <View style={styles.peopleView} key={i}>
                                        <Image style={styles.pepleImg} source={{uri:x.avatars.large}}/>
                                        <Text style={{marginTop: 10}} numberOfLines={1}>{x.name}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>

                <ScrollableTabView
                    style={{marginTop: 30,}}
                    renderTabBar={() => <DefaultTabBar/>}
                    tabBarUnderlineStyle={{
                        backgroundColor: '#000',
                        height: 0.5,
                        width: '45%',
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                    tabBarBackgroundColor='#f3f3f3'
                    tabBarActiveTextColor='#000'
                    tabBarInactiveTextColor='#959595'
                    tabBarTextStyle={{fontSize: 15,textAlignVertical: 'center'}}
                    locked={false}
                >
                    <View tabLabel='短评'>
                    {popular_comments.map((v,i)=>{
                        return (
                            <View style={{marginTop:18,flexDirection:'row',paddingRight:20}}
                                key={i}
                            >
                                <View>
                                    <Image source={{uri:v.author.avatar}} style={{marginLeft:10, width:40,height:40,borderRadius:20}} />
                                </View>

                                <View style={{marginLeft:10,flex:1}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{lineHeight:25}}>{v.author.name}</Text>
                                    </View>
                                    <Text style={{marginBottom:8,color:'#3B3B3B'}}>{v.content}</Text>
                                    <Text style={{marginTop:10, color:'#9b9b9b'}}>4天前</Text>
                                </View>

                                <View style={{position:'absolute',right:20,top:0}}>
                                    {/*//绝对布局*/}
                                    <Text style={{color:'#9B9B9B'}}>👍{v.useful_count}</Text>
                                </View>
                            </View>
                        )
                    })}
                    </View>
                    <View tabLabel='讨论区'>
                        {popular_comments.map((v,i) => {
                            return (
                                <View style={{marginTop:18,flexDirection:'row',paddingRight:20}}
                                    key={i}
                                >
                                    <View>
                                        <Image source={{uri:v.author.avatar}} style={{marginLeft:10, width:40,height:40,borderRadius:20}} />
                                    </View>

                                    <View style={{marginLeft:10,flex:1}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{lineHeight:25}}>{v.author.name}</Text>
                                        </View>
                                        <Text style={{marginBottom:8,color:'#3B3B3B'}}>{v.content}</Text>
                                        <Text style={{marginTop:10, color:'#9b9b9b'}}>4天前</Text>
                                    </View>
                                    <View style={{position:'absolute',right:20,top:0}}>
                                        <Text style={{color:'#9B9B9B'}}>👍{v.useful_count}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollableTabView>
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    titleView: {
        height: 220,
        justifyContent: 'center',
        backgroundColor: '#2A362C',
    },
    titleImg: {
        alignSelf: 'center',
        width: width/2,
        height: 190,
    },
    nameView: {
        flex:3,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    detailText: {
        marginTop: 5,
    },
    scoreView: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 90,
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderColor: 'gray',
        borderWidth: 0.2,
        backgroundColor: 'white',
        shadowColor: '#9b9b9b',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
    },
    peopleView: {
        width: 100,
        alignItems: 'center',
        flexDirection: 'column',
    },
    pepleImg: {
        width: 80,
        height: 140,
    },
});