import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView, FlatList, TouchableOpacity, Text} from 'react-native';
import SearchCity from './SearchCity';

export default class AddCity extends Component<Props> {
    static navigationOptions = {
        header: null,
    }

    separator = () => {
        return (
            <View style={{backgroundColor: 'white',marginLeft: 5, marginRight: 5,height: 0.5}}>
            </View>
        )
    }

    renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.cellBgView}
                onPress={() => {
                this.props.navigation.goBack()
            }}>
                <View style={{marginLeft: 15, marginTop: 15, marginBottom: 15}}>
                    <Text style={styles.font}>{item.title}</Text>
                </View>
                <View style={{marginRight: 15, marginTop: 15, marginBottom: 15}}>
                    <Text style={styles.font}>{item.temperature}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let Data = [{
            title: '北京',
            temperature: '30°C',
        },{
            title: '武汉',
            temperature: '26°C',
        },{
            title: '沈阳',
            temperature: '25°C',
        }];
        const {navigation} = this.props;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.container}>
                    <View style={{flexDirection: 'row', marginTop: 15, justifyContent: 'space-between', paddingRight: 20, paddingLeft: 20, marginBottom: 15,}}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <Text style={{fontSize: 17, color: 'white'}}> X </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                alert('点击了编辑')
                            }}>
                            <Text style={{fontSize: 17, color: 'white'}}>编辑</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        ItemSeparatorComponent={this.separator}
                        data={Data}//数据源
                        renderItem={this.renderItem}// 解析数据
                        keyExtractor={(item, index)=>index.toString()}
                    >
                    </FlatList>
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
        // padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addCity: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
})