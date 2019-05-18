/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {createAppContainer} from "react-navigation";
import {APPSwitch} from "./AppNavigator";
import LoginPage from './LoginPage';
const AppStackNavigatorContainer=createAppContainer(APPSwitch);


GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer);
AppRegistry.registerComponent('LoginPage',()=>AppStackNavigatorContainer);//导出原生需要使用的界面