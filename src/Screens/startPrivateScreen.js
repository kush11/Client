import { Navigation } from 'react-native-navigation';

const startSingleScreen = () => {
	return Navigation.startSingleScreenApp({
		screen: {
			screen: 'Client.PrivateScreen',
			title: 'Welcome to my private screen',
		},
	});
};

export default startSingleScreen;
