import React, {Component} from 'react';
import {View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    Alert,
    FlatList,
} from 'react-native';
import SearchCity from './SearchCity';
import Swipeout from 'react-native-swipeout';
import {deleteCity} from "../../actions/CityAction";
import {connect} from 'react-redux';

class CityList extends Component<Props> {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderItems = ({item}) => {
        const {navigation} = this.props;
        let btns = [
            {
                text: '删除',
                backgroundColor: 'red',
                onPress: () => {
                    Alert.alert('确认删除' + item.title + '?','',[
                        {text: 'OK',
                            onPress: () => {
                                this.props.deleteCityByTitle(item.title)
                            }
                        },
                        {text: 'Cancel',
                            onPress: () => {
                                console.log('a');
                            }
                        },
                    ])
                },
            }
        ];
        return (
            <Swipeout
                style={{backgroundColor: 'black'}}
                close={!(this.state.sectionID === item.sectionID && this.state.rowID === item.rowID)}
                right={btns}
                rowID={item.rowID}
                sectionID={item.sectionID}
                onOpen={(sectionID, rowID) => {
                    this.setState({
                        sectionID,
                        rowID,
                    })
                }}
            >
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                    if (navigation.state.params.changeCity) {
                        navigation.state.params.changeCity(item.title,);
                    }
                }}>
                    <View style={styles.item}>
                        <Text style={styles.text}>{item.title}</Text>
                        <Text style={styles.text}>{item.temperature}</Text>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    }

    render() {
        const {navigation, city} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.container}>
                    <View style={{flexDirection: 'row', marginTop: 15, justifyContent: 'flex-start', paddingRight: 20, paddingLeft: 20, marginBottom: 15,}}>
                        <TouchableOpacity onPress={() => {
                            navigation.goBack()
                        }}>
                            <Text style={{fontSize: 17, color: 'white'}}> X </Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={city}
                        renderItem={this.renderItems}
                        keyExtractor={(item, index)=>index.toString()}
                    />

                    <View style={styles.addCity}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('SearchCity')
                        }}>
                            <Text style={styles.font}>+ 添加城市</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    font: {
        color: 'white',
        fontSize: 20,
    },
    cellBgView: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addCity: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    item: {
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        backgroundColor: '#aeffb1',
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 5,//漂浮的效果
        borderRadius: 5,//圆角
    },
    text: {
        color: '#444444',
        fontSize: 20,
        textAlignVertical: 'center',
    },
})
// redux connect
// 两个参数 第一个传值（数字、字符串、数组、对象），第二个传方法（函数）

const mapStateToProps = state => ({city: state.city})

const mapDispatchToProps = dispatch => ({
    deleteCityByTitle: (title) => {
        dispatch(deleteCity(title))
    }
})

let cityContainer = connect(mapStateToProps, mapDispatchToProps)(CityList);

export default cityContainer
