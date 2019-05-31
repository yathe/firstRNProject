import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../../tool/CustomTabBar';
import imgStore from '../../tool/ImgStore';
import {addComment, deleteComment, updateItemLikeNum, updateLikeNum, addTransmitNum} from "../../actions/CommentAction";
import {connect} from 'react-redux';

const actionArr = [
    require('../../pictures/zan.png'),
    require('../../pictures/pinglun.png'),
    require('../../pictures/zhuanfa.png'),
    require('../../pictures/share.png'),
];
let dimensions = require('Dimensions');
let {screenWidth, screenHeight} = dimensions.get('window');
let ImagePicker = require('react-native-image-picker');
let options = {
    title: '请选择图片来源',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册图片',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
};

class WeatherDetail extends Component<Props> {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            week: [],
            hasImg: false,
        }
    }

    fetchData = () => {
        const url = `https://www.tianqiapi.com/api/?city=${this.props.navigation.state.params.title}`;
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                const arrData = responseData.data;
                const tabNames = arrData.map(({date, week}) => ({
                    date,
                    week
                }));
                this.setState({
                    loaded: true,
                    week: arrData,
                    tabNames: tabNames,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        try {
            this.fetchData();
        } catch (e) {
            console.error(e);
        }
    }

    clickAction = (index) => {
        switch (index) {
            case 0:
                this.props.updateLikeNum();
                break;
            case 1:
                this.scrollView.scrollToEnd({animated: true});// 平滑地滚动到视图底部
                break;
            case 2:
                this.props.addTransmitNum();
                break;
            case 3:
                alert('点击了分享');
                break;
        }
    }

    clickComment = (id) => {
        this.props.updateLikeNumById(id);
    }

    adjustFormat = (str) => {
        if (str >= 0 && str <= 9) {
            return  '0' + str;
        }
        return str
    }

    search = () => {
        let time = new Date();
        let hour = time.getHours().toString();
        let minute = time.getMinutes().toString();
        this.props.addCommentByDetail(this.adjustFormat(hour) + ':' + this.adjustFormat(minute), this.state.text);
        this.setState({
            text: '',
            hasImg: false,
        })
    }

    choosePic = () => {
        ImagePicker.showImagePicker(options, (response => {
            if (response.didCancel) {
                alert('cancel');
            } else if (response.error) {
                alert('error');
            } else {
                let source = {uri: response.uri};
                this.setState({
                    hasImg: true,
                    avatarSource: source,
                })
            }
        }))
    }

    renderItem = ({item}) => {
        return (
            <View style={styles.cellView}>
                <Image source={item.img}
                    resizeMode='contain'
                    style={styles.img}
                />
                <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginRight: 10, }}>
                    <Text style={{fontSize: 18, }}>{item.personId}</Text>
                    <Text style={{color:'gray', marginTop: 5}}>{item.time}</Text>
                    <View style={{marginTop: 5, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => {

                        }}>
                            <Text style={this.state.hasImg && this.state.avatarSource ? {color: 'blue'} : {width: 0}}>查看图片</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {

                        }}>
                            <Text>{item.comment}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{position: 'absolute', right: 10, flexDirection: 'row', top: 15}}>
                    <Text>{item.likeCount > 0 ? item.likeCount : ''}</Text>
                    <TouchableOpacity style={{marginLeft: 8, }} onPress={() => {
                        this.clickComment(item.id);
                    }}>
                        <Image source={item.didClickLike ? require('../../pictures/zanClicked.png') : require('../../pictures/zan.png')}
                            resizeMode='contain'
                            style={{width: 15, height: 15, }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 20, }} onPress={() => {
                        alert('点击了转发');
                        this.props.deleteCommentById(item.id);
                    }}>
                        <Image source={require('../../pictures/share.png')}
                            resizeMode='contain'
                            style={{width: 15, height: 15, }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        }
        const {navigation} = this.props;

        return(
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior={'position'}>
                    <ScrollView bounces={false}
                        scrollEventThrottle={1}
                        showsVerticalScrollIndicator={false}
                        keyboardDismissMode={true}
                        ref={ref => this.scrollView = ref}
                    >
                        <View style={{flexDirection: 'row', marginTop: 15, justifyContent: 'space-between', paddingRight: 15, paddingLeft: 15}}>
                            <TouchableOpacity onPress={() => {
                                navigation.goBack()
                            }}>
                                <Text style={{fontSize: 17, color: 'white'}}> 返回 </Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 17, color: 'white'}}>{this.props.navigation.state.params.title}</Text>
                            <TouchableOpacity onPress={() => {
                                alert('点击了分享')
                            }}>
                                <Text style={{fontSize: 17, color: 'white'}}>分享</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollableTabView style={{marginTop: 10, flex: 1}}
                            renderTabBar={() => <CustomTabBar dataNames={this.state.tabNames}/>}
                            tabBarUnderlineStyle={{backgroundColor: 'black', height: 2,}}
                            tabBarActiveTextColor='black'
                            tabBarInactiveTextColor='#959595'
                            tabBarTextStyle={{fontSize: 15,textAlignVertical: 'center'}}
                            locked={false}
                        >
                            {this.state.week.map((x, index) => {
                                return (
                                    <View tabLabel={x.date} key={index}>
                                        <ScrollView style={{marginBottom: 65}}
                                            bounces={false}
                                            scrollEventThrottle={1}
                                            showsVerticalScrollIndicator={false}
                                            keyboardDismissMode={true}
                                        >
                                            <View style={styles.detailBgView}>
                                                <Image style={{width: 230, height: 180, marginTop: 20, marginLeft: 20}}
                                                    resizeMode='contain'
                                                    source={imgStore[x.wea_img] || imgStore['yin']}
                                                />
                                                <View style={styles.detailTemp}>
                                                    <Text style={{fontSize: 20, marginTop: 10}}>{x.wea}</Text>
                                                    <Text style={{fontSize: 20, marginTop: 10}}>{x.update_time}</Text>
                                                </View>
                                                <View style={styles.detailTemp}>
                                                    <Text style={{fontSize: 20, marginTop: 10}}>温度</Text>
                                                    <Text style={{fontSize: 20, marginTop: 10}}>{x.tem1}/{x.tem2}</Text>
                                                </View>
                                                <View style={styles.detailTemp}>
                                                    <Text style={{fontSize: 20, marginTop: 10}}>风力</Text>
                                                    <Text style={{fontSize: 20, marginTop: 10}}>{x.win}</Text>
                                                </View>
                                                <View style={styles.detailTemp}>
                                                    <Text style={{fontSize: 20, marginTop: 10}}>空气质量</Text>
                                                    <View style={styles.situation}>
                                                        <Text style={{fontSize: 20, marginTop: 10}}>{x.air}</Text>
                                                        <View style={{borderRadius:5, borderWidth:0.2,  backgroundColor: '#ffff8f', marginTop: 5, marginLeft: 5,paddingRight: 10,paddingLeft: 10,paddingTop: 2,paddingBottom: 2}}>
                                                            <Text style={{color: 'black', fontSize: 15, textAlignVertical: 'center', marginTop: 6}}>良</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.detailBgView2}>
                                                {x.index.map((item, index) =>
                                                    <View style={styles.detailTemp} key={index}>
                                                        <Text style={{flex:1, fontSize: 20, marginTop: 10}}>{item.title.indexOf('</em>') >= 0 ?'今日寄语': item.title}</Text>
                                                        <Text style={{flex:1, fontSize: 20, marginTop: 10, textAlign: 'right'}}>{item.level === null? item.desc: item.level}</Text>
                                                    </View>
                                                )}
                                            </View>

                                            <View style={styles.actionView}>
                                                {actionArr.map((item, index) => {
                                                    return (
                                                        <TouchableOpacity key={index} onPress={() => {
                                                            this.clickAction(index)
                                                        }}>
                                                            <Image source={index == 0 && this.props.clickLike? require('../../pictures/zanClicked.png') : item}
                                                                style={{width: 20, height: 20,}}
                                                                resizeMode='contain'
                                                            />
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                            </View>

                                            <View style={styles.commentView}>
                                                <View style={styles.countView}>
                                                    <Text style={{marginLeft: 20}}>赞</Text>
                                                    <Text style={{marginLeft: 8}}>{this.props.likeNum}</Text>
                                                    <Text style={{marginLeft: 20}}>评论</Text>
                                                    <Text style={{marginLeft: 8}}>{this.props.commentData.length}</Text>
                                                    <View style={{position:'absolute', right: 20, flexDirection: 'row'}}>
                                                        <Text style={{marginRight: 8}}>转发</Text>
                                                        <Text>{this.props.transmitNum}</Text>
                                                    </View>
                                                </View>
                                                <FlatList renderItem={this.renderItem}
                                                     data={this.props.commentData}
                                                     keyExtractor={(item, index)=>index.toString()}
                                                     // extraData={this.state}
                                                     scrollEnabled={false}
                                                     handleMethod = {({viewableItems}) => this.handleViewableItemsChanged(viewableItems)}
                                                />
                                            </View>
                                        </ScrollView>
                                        <View style={styles.commentArea}>
                                            <Image source={require('../../pictures/pic.png')}
                                                style={{marginLeft: 10, width: 50, height: 50, borderRadius: 25,}}
                                            />
                                            <TextInput style={styles.searchText}
                                                 onChangeText={(text) => this.setState({text})}
                                                 onSubmitEditing={this.search}
                                                 placeholder='添加评论...'
                                                 value={this.state.text}
                                            />

                                        </View>






                                        {/*<View onLayout={e => this.setState({scrollViewHeight: e.nativeEvent.layout.y})}/>*/}
                                        {/*<View style={styles.expendCommentArea}>*/}
                                        {/*    <View style={{flexDirection: 'row',}}>*/}

                                        {/*    <Image style={{width: this.state.hasImg ? 65 : 0, height: 70, marginLeft: this.state.avatarSource != '' ? 10 : 0, marginTop: 10,}}*/}
                                        {/*        source={this.state.avatarSource}*/}
                                        {/*    />*/}
                                        {/*        <TouchableOpacity onPress={() => {*/}
                                        {/*            this.setState({*/}
                                        {/*                hasImg: false,*/}
                                        {/*            })*/}
                                        {/*        }}>*/}
                                        {/*            <Image style={{width: this.state.hasImg ? 20 : 0, height: 20,  marginLeft: -23, marginTop: 12,}}*/}
                                        {/*                source={require('../../pictures/deleteImg.png')}*/}
                                        {/*            />*/}
                                        {/*        </TouchableOpacity>*/}
                                        {/*    <TextInput multiline={true} // 允许多行文本*/}
                                        {/*        maxLength={140} // 限制最多字符数为140*/}
                                        {/*        onChangeText={(text) => this.setState({text})}*/}
                                        {/*        placeholder='添加评论...'  // 占位文字*/}
                                        {/*        value={this.state.text}   // 默认文字*/}
                                        {/*        style={{fontSize: 18, marginLeft: 10, marginTop: 10, height: 85, paddingTop: 10, paddingRight: 10}}*/}
                                        {/*    />*/}
                                        {/*    </View>*/}
                                        {/*    <View style={styles.operationView}>*/}
                                        {/*        <Image source={require('../../pictures/pic.png')}*/}
                                        {/*            style={{marginLeft: 15, width: 20, height: 20}}*/}
                                        {/*        />*/}
                                        {/*        <TouchableOpacity style={{marginLeft: 10}}*/}
                                        {/*            onPress={() => {*/}
                                        {/*                this.choosePic();*/}
                                        {/*            }}*/}
                                        {/*        >*/}
                                        {/*            <Image source={require('../../pictures/tupian.png')}*/}
                                        {/*                style={{width: 20, height: 20,}}*/}
                                        {/*                resizeMode='contain'*/}
                                        {/*            />*/}
                                        {/*        </TouchableOpacity>*/}
                                        {/*        <Text style={{right: 40, position: 'absolute', color: 'gray'}}>140</Text>*/}
                                        {/*        <TouchableOpacity style={{ right: 10, position: 'absolute'}}*/}
                                        {/*            onPress={() => {*/}
                                        {/*                this.search()*/}
                                        {/*            }}*/}
                                        {/*        >*/}
                                        {/*            <Image source={require('../../pictures/zhifeiji-2.png')}*/}
                                        {/*                style={{ width: 20, height: 20,}}*/}
                                        {/*                resizeMode='contain'*/}
                                        {/*            />*/}
                                        {/*        </TouchableOpacity>*/}


                                        {/*    </View>*/}
                                        {/*</View>*/}
                                    </View>

                                )
                            })}

                        </ScrollableTabView>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#dcdbdf',
    },
    detailBgView: {
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingBottom: 10,
    },
    detailBgView2: {
        flexDirection: 'column',
        backgroundColor: '#dcdcdc',
        paddingBottom: 20,
    },
    detailTemp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 10,
    },
    situation: {
        flexDirection: 'row',
    },
    actionView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: 'white',
    },
    commentView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: 10,
    },
    countView: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
    },
    seperatorView: {
        marginLeft: 5,
        marginRight: 5,
        height:0.5,
        backgroundColor:'gray',
        marginBottom: 10,
    },
    cellView: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },
    commentArea: {
        flexDirection: 'row',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
    },
    img: {
        marginLeft: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    searchText: {
        flex: 1,
        padding: 10,
        fontSize: 18,
    },
    expendCommentArea: {
        // position: 'absolute',
        // paddingBottom: 0,
        marginTop: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    operationView: {
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 10,
    },
})

const mapStateToProps = state => ({
    commentData: state.comments.data,
    clickLike: state.comments.clickLike,
    likeNum: state.comments.likeNum,
    transmitNum: state.comments.transmitNum,
})

const mapDispatchToProps = dispatch => ({
    deleteCommentById: (id) => {
        dispatch(deleteComment(id))
    },
    addCommentByDetail: (time, comment) => {
        dispatch(addComment(time, comment))
    },
    updateLikeNumById: (id) => {
        dispatch(updateItemLikeNum(id))
    },
    updateLikeNum: () => {
        dispatch(updateLikeNum())
    },
    addTransmitNum: () => {
        dispatch(addTransmitNum())
    },
})

let commentContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherDetail)

export default commentContainer