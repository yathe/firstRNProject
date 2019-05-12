/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {createAppContainer} from "react-navigation";
import {APPSwitch} from "./AppNavigator";
import LoginPage from './LoginPage';
const AppStackNavigatorContainer=createAppContainer(APPSwitch);

AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer);
AppRegistry.registerComponent('LoginPage',()=>AppStackNavigatorContainer);//导出原生需要使用的界面