import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    Image
} from "react-native";
import SearchInput from '../../tool/SearchInput';
import Grid from 'react-native-grid-component';
import {addCity, deleteCity} from "../../actions/CityAction";
import {updateLocation, updateToSelected, updateToUnSelected} from "../../actions/LocationAction";
import {connect} from 'react-redux';

const dimensions = require('Dimensions');//屏幕信息
const {screenWidth, screenHeight} = dimensions.get('window');//获取屏幕的宽和高

class SearchCity extends Component<Props> {
    constructor(props) {
        super(props);
        this.props.location.map((item) => {
            if (item.title != '定位') {
                const step = this.props.city.findIndex(it => it.title === item.title.substring(0, item.title.length - 1));
                if (step > -1) {
                    this.props.updateToSelectedByTitle(item.title)
                } else {
                    this.props.updateToUnSelectedByTitle(item.title)
                }
            }
        });

        this.state = {
            activeList: [],
            deleteList: [],
            isSearch: false,
        };
    }

    static navigationOptions = ({
        header: null,
    })

    onPressHandler = (itemId) => {
        const array = [];
        const deleteArr = [];
        this.props.location.map((it, index) => {
            if(it.id === itemId) {
                if (it.chosen) {
                    this.props.updateToUnSelectedByTitle(it.title)
                } else {
                    this.props.updateToSelectedByTitle(it.title)
                }
                it.chosen = !it.chosen
            }
            const step = this.props.city.findIndex(item => item.title === it.title.substring(0, it.title.length - 1));
            // 新增的城市
            if (it.chosen && step < 0) {
                array.push(it.title.substring(0, it.title.length - 1));
            }
            // 取消选择的城市
            if (!it.chosen && step > -1) {
                deleteArr.push(it.title.substring(0, it.title.length - 1))
            }
        });
        this.setState({
            activeList: array,
            deleteList: deleteArr,
        });
    }

    fetchData = () => {
        // const url = 'https://api.map.baidu.com/location/ip?ak=S0c7jh3fCDKDDdaIALdMOjfHUFqeePzl'; //HTTPS协议
        // fetch(url)
        //     .then(response => response.json())
        //     .then((responseData) => {
        //         this.props.updateLocationByTitle(responseData.content.address_detail.city);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        this.props.updateLocationByTitle('武汉市');
    }

    renderItem = (item) => {
        if (item.isOne) {
        // if (item.id == '0') {
            return (
                //<TouchableOpacity key={item.id} onPress={() => {
                //    item.isOne ? this.fetchData() : this.onPressHandler(item.id);
                //}}>
                <TouchableOpacity key={item.id} onPress={() => {
                    this.fetchData()
                }}>
                    <View style={styles.itemView}>
                        <Image
                            source={require('../../pictures/location.jpg')}
                            style={{width: 10, height: 18, marginRight: 2}}
                            resizeMode='stretch'// 图片可以铺满
                        />
                        <Text style={{
                            marginTop: 10,
                            marginBottom: 10,
                            alignSelf: 'center',
                            textAlign: 'center',
                            color: 'gray'
                        }}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity key={item.id} onPress={() => {
                    this.onPressHandler(item.id)
                }}>
                    <View style={styles.itemView}>
                        <Text style={{
                            marginTop: 10,
                            marginBottom: 10,
                            alignSelf: 'center',
                            textAlign: 'center',
                            color: item.chosen ? 'green' : 'gray'
                        }}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    // 定义接受子组件值的方法
    receiveCityName = (text) => {
        if (text === '') {
            this.setState({
                isSearch: false,
            })
        } else {
            const array = [];
            this.props.location.forEach((it) => {
                if (it.title.indexOf(text) >= 0) {//模糊搜索
                    array.push(it)
                }
            });
            this.setState({
                data: array,
                isSearch: true,
            })
        }
    }

    render() {
        const {navigation} = this.props;
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <View style={{marginTop: 20, marginLeft: 15, marginBottom: 30, marginRight: 15, justifyContent: 'space-between', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack()
                        }}>
                            <Text style={{color: 'black', fontSize: 20}}>X</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {

                            // 新增
                            this.state.activeList.map((it) => {
                                this.props.addCityByTitle(it)
                            });

                            // 取消选择
                            this.state.deleteList.map((it) => {
                                this.props.deleteCityByTitle(it)

                            });

                            navigation.navigate("AddCity");
                        }}>
                            <Text style={{color: 'black', fontSize: 20}}>确认添加</Text>
                        </TouchableOpacity>
                    </View>
                    <SearchInput name='city'
                        receiveCityName={this.receiveCityName}
                    />

                    <View style={styles.addView}>
                            <Text style={{marginTop: 20, marginLeft: 10, fontSize: 20}}>热门城市</Text>
                        <View style={{flex: 1, marginTop: 20, flexDirection: 'column', justifyContent: 'center'}}>
                            <Grid
                                renderItem={this.renderItem}
                                data={this.state.isSearch ? this.state.data : this.props.location}
                                keyExtractor={(item, index)=>index.toString()}
                                numColumns={3}
                                itemHasChanged={(it1, it2) => it1.chosen === it2.chosen}
                                // 解决不刷新界面的问题
                            >
                            </Grid>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    addView: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    itemView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray',
        height: 40,
        width: 100,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
    },
})

const mapStateToProps = state => ({city: state.city, location: state.location})
const mapDispatchToProps = dispatch => ({
    addCityByTitle: (title) => {
        dispatch(addCity(title, '-'))
    },
    deleteCityByTitle: (title) => {
        dispatch(deleteCity(title))
    },
    updateLocationByTitle: (title) => {
        dispatch(updateLocation(title))
    },
    updateToSelectedByTitle: (title) => {
        dispatch(updateToSelected(title))
    },
    updateToUnSelectedByTitle: (title) => {
        dispatch(updateToUnSelected(title))
    },
})

let cityContainer = connect(mapStateToProps, mapDispatchToProps)(SearchCity);

export default cityContainer