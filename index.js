/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import FirstPage from './FirstPage'
import LoginPage from './LoginPage'
import {createAppContainer} from "react-navigation";
import {AppStackNavigator} from "./AppNavigator";
const AppStackNavigatorContainer=createAppContainer(AppStackNavigator);

// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => FirstPage);
AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer);