import { Navigation } from 'react-native-navigation';

const startSingleScreen = () => {
	return Navigation.startSingleScreenApp({
		screen: {
			screen: 'Client.AuthScreen',
		},
	});
};

export default startSingleScreen;
