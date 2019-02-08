import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import startPrivate from './Screens/startPrivateScreen';

import AuthScreen from './Screens/AuthScreen';
import CreateAnAccount from './Screens/CreateAnAccount';
import PrivateScreen from './Screens/Private';

Navigation.registerComponent('Client.AuthScreen', () => AuthScreen);
Navigation.registerComponent('Client.CreateAnAccount', () => CreateAnAccount);
Navigation.registerComponent('Client.PrivateScreen', () => PrivateScreen);

AsyncStorage.getItem('x-auth').then(token => {
	axios
		.get('http://172.30.13.203:3000/private/private', {
			headers: {
				'x-auth': token,
			},
		})
		.then(response => {
			if (response.status == 200) {
				return startPrivate();
			}
			return Navigation.startSingleScreenApp({
				screen: {
					screen: 'Client.AuthScreen',
				},
			});
		})
		.catch(() => {
			return Navigation.startSingleScreenApp({
				screen: {
					screen: 'Client.AuthScreen',
				},
			});
		});
});
